package com.example.eBill.qrGenerator;

import io.nayuki.qrcodegen.*;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Objects;

public class QRCodeGenerator {

    public static void generateQR(String string, String name) throws IOException {
        QrCode qr0 = QrCode.encodeText(string, QrCode.Ecc.HIGH);
        BufferedImage img = toImage(qr0, 2, 3, 0xFFFFFF, 0x000000);  // See QrCodeGeneratorDemo
        String path = "uploads/qr-" + name +".png";
        ImageIO.write(img, "png", new File(path));
    }
    private static BufferedImage toImage(QrCode qr, int scale, int border, int lightColor, int darkColor) {
        Objects.requireNonNull(qr);
        if (scale <= 0 || border < 0)
            throw new IllegalArgumentException("Value out of range");
        if (border > Integer.MAX_VALUE / 2 || qr.size + border * 2L > Integer.MAX_VALUE / scale)
            throw new IllegalArgumentException("Scale or border too large");

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
