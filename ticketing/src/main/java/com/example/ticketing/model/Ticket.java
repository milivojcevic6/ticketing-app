package com.example.ticketing.model;

import io.nayuki.qrcodegen.QrCode;
import jakarta.persistence.*;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Objects;

import static com.example.ticketing.model.TicketStatus.ACTIVE;

@Entity
@Table(name = "ticket")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate issuedDate;
    private TicketStatus status;



    @Lob // Indicates the field will store large binary data
    @Column(length = 1048576) // Specify the desired column length
    private byte[] qrCodeImage; // Field to store the binary picture data

//    // Relationships
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private Userr userr;
    // Relationships
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    // Constructors, getters, and setters
    public Ticket() {
    }

    public Ticket(LocalDate issuedDate, TicketStatus status, byte[] qrCodeImage, User user, Event event) {
        this.issuedDate = issuedDate;
        this.status = status;
        this.qrCodeImage = qrCodeImage;
        this.user = user;
        this.event = event;
    }

    public Ticket(LocalDate issuedDate, User user, Event event) throws IOException {
        this.issuedDate = issuedDate;
        this.user = user;
        this.event = event;
        this.status = ACTIVE;
        this.qrCodeImage = makeQRcode(issuedDate, user, event);
    }

    private byte[] makeQRcode(LocalDate issuedDate, User user, Event event) throws IOException {

        String text = event.getId() + "," + event.getName() + "," + user.getFirstName()
                + "," + user.getLastName() + "," + issuedDate.toString();

        byte[] qrCodeBytes = generateQR(text);
        System.out.println("Length is: "+qrCodeBytes.length);
        return qrCodeBytes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getIssuedDate() {
        return issuedDate;
    }

    public void setIssuedDate(LocalDate issuedDate) {
        this.issuedDate = issuedDate;
    }

    public TicketStatus getStatus() {
        return status;
    }

    public void setStatus(TicketStatus status) {
        this.status = status;
    }

    public byte[] getQrCodeImage() {
        return qrCodeImage;
    }

    public void setQrCodeImage(byte[] qrCodeImage) {
        this.qrCodeImage = qrCodeImage;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }


    public static byte[] generateQR(String string) throws IOException {

        QrCode qr0 = QrCode.encodeText(string, QrCode.Ecc.HIGH);

        BufferedImage img = toImage(qr0, 2, 3, 0xFFFFFF, 0x000000);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        ImageIO.write(img, "png", outputStream);

        return outputStream.toByteArray();
    }
    private static BufferedImage toImage(QrCode qr, int scale, int border, int lightColor, int darkColor) {

        Objects.requireNonNull(qr);

//        if (scale <= 0 || border < 0)
//            throw new IllegalArgumentException("Value out of range");
//
//        if (border > Integer.MAX_VALUE / 2 || qr.size + border * 2L > Integer.MAX_VALUE / scale)
//            throw new IllegalArgumentException("Scale or border too large");

        BufferedImage result = new BufferedImage((qr.size + border * 2) * scale, (qr.size + border * 2) * scale, BufferedImage.TYPE_INT_RGB);
        for (int y = 0; y < result.getHeight(); y++) {
            for (int x = 0; x < result.getWidth(); x++) {
                boolean color = qr.getModule(x / scale - border, y / scale - border);
                result.setRGB(x, y, color ? darkColor : lightColor);
            }
        }
        return result;
    }
}
