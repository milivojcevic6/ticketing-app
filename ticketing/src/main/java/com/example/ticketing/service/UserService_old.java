//package com.example.ticketing.service;
//
//import com.example.ticketing.config.CusomUserDetails;
//import com.example.ticketing.model.Section;
//import com.example.ticketing.model.Userr;
//import com.example.ticketing.repository.SectionRepository;
//import com.example.ticketing.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import java.util.HashSet;
//import java.util.Optional;
//import java.util.Set;
//import java.util.stream.Collectors;
//
//@Service
//public class UserService implements UserDetailsService {
//
////    @Autowired
////    UserRepository userRepository;
////    @Autowired
////    SectionRepository sectionRepository;
//
//    //Constructor
//
//    /*public UserService(UserRepository userRepository) {
//        super();
//        this.userRepository = userRepository;
//    }*/
//
////    @Override
////    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
////        Userr userr = userRepository.findByUsername(username)
////                .orElseThrow(() -> new UsernameNotFoundException("username doesn't exist"));
////
////        if(!username.equals(""))
////            return new CusomUserDetails(userr);
////
////        User  newUser;
////
////        if(userr != null){
////            String uname = userr.getUsername();
////            String pass = userr.getPassword();
////            Set<String> authorities = userr.getAuthorities();
////            Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
////            grantedAuthorities = authorities.stream()
////                    .map(SimpleGrantedAuthority::new)
////                    .collect(Collectors.toSet());
////            newUser = new User(uname, pass, grantedAuthorities);
////            return newUser;
////            //return new CusomUserDetails(userr);
////
////        }
////        else{
////            Section section = sectionRepository.findByUsername(username)
////                    .orElseThrow(() -> new UsernameNotFoundException("username doesn't exist"));
////            String uname = section.getUsername();
////            String pass = section.getPassword();
////            Set<String> authorities = section.getAuthorities();
////            Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
////            grantedAuthorities = authorities.stream()
////                    .map(SimpleGrantedAuthority::new)
////                    .collect(Collectors.toSet());
////            newUser = new User(uname, pass, grantedAuthorities);
////            return newUser;
////        }
////
////    }
//
//
//    private final UserRepository userRepository;
//    private final SectionRepository sectionRepository;
//
//    @Autowired
//    public UserService(UserRepository userRepository, SectionRepository sectionRepository) {
//        this.userRepository = userRepository;
//        this.sectionRepository = sectionRepository;
//    }
//
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        System.out.println("loadUserByUsername called for username: " + username+".");
//
//        Optional<Userr> userOptional = userRepository.findByUsername(username);
//        if (userOptional.isPresent()) {
//            Userr user = userOptional.get();
//            System.out.println("User found: " + user.getUsername());
//
//            String role;
//            if (user.getId() == 1) {
//                role = "admin";
//            } else {
//                role = "user";
//            }
//
//            System.out.println("Assigned role: " + role);
//
//            return org.springframework.security.core.userdetails.User.builder()
//                    .username(user.getUsername())
//                    .password(user.getPassword())
//                    .roles(role)
//                    .build();
//        }
//
//        Optional<Section> sectionOptional = sectionRepository.findByUsername(username);
//        if (sectionOptional.isPresent()) {
//            Section section = sectionOptional.get();
//            System.out.println("Section found: " + section.getUsername());
//
//            return org.springframework.security.core.userdetails.User.builder()
//                    .username(section.getUsername())
//                    .password(section.getPassword())
//                    .roles("section")
//                    .build();
//        }
//
//        throw new UsernameNotFoundException("User not found with username: " + username);
//    }
//
//
//
//
//
//    public Userr addUser(Userr user){
//        return userRepository.save(user);
//    }
//
//    public Section addSection(Section section){
//        return sectionRepository.save(section);
//    }
//}
