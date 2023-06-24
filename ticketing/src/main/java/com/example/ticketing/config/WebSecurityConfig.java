//package com.example.ticketing.config;//package com.example.ticketing.config;
//
//import com.example.ticketing.service.UserService;
//import com.mysql.cj.protocol.AuthenticationProvider;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.web.servlet.FilterRegistrationBean;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.Ordered;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//import org.springframework.web.filter.CorsFilter;
//
//@Configuration
//@EnableWebSecurity
//public class WebConfig {
//    /*@Bean
//    public FilterRegistrationBean<CorsFilter> corsFilter() {
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        CorsConfiguration config = new CorsConfiguration();
//        config.setAllowCredentials(true);
//        config.addAllowedOrigin("http://localhost:3000"); // Replace with the actual URL of your React development server
//        config.addAllowedHeader("*");
//        config.addAllowedMethod("*");
//        source.registerCorsConfiguration("/**", config);
//        FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter(source));
//        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
//        return bean;
//    }*/
//
////    private UserService userService;
//
////    @Autowired
////    public WebConfig(UserService userService){
////        this.userService = userService;
////    }
//
//
////    @Bean
////    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
////    throws Exception{
////       return authenticationConfiguration.getAuthenticationManager();
////    }
//
//    //authentication
////    @Bean
////    public UserDetailsService userDetailsService(){
////        return new UserService();
////    }
//
//    //passwordEncoder
//    @Bean
//    public PasswordEncoder encoder(){
//        return new BCryptPasswordEncoder();
//    }
//
//    //authentication provider
//    @Bean
//    public DaoAuthenticationProvider authenticationProvider(){
//        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
//        provider.setUserDetailsService(userDetailsService);
//        provider.setPasswordEncoder(encoder());
//        return provider;
//    }
//
//    @Autowired
//    private UserDetailsService userDetailsService;
//
////    @Bean
////    AuthenticationProvider authenticationProvider(){
////        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
////        provider.setUserDetailsService(userDetailsService);
////        provider.setPasswordEncoder(encoder());
////        return provider;
////    }
//
//    //authorisation
//    @Bean
//    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
//
////        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
////
////        authenticationManagerBuilder.userDetailsService(userDetailsService()).passwordEncoder(encoder());
////
//
//
//        return http.csrf().disable().authorizeHttpRequests(auth -> {
//            auth.requestMatchers("").permitAll();
//            //auth.requestMatchers("/api/users/register", "/api/sections/register").permitAll();
//            //auth.requestMatchers("").hasAnyRole("user", "section");
//            //auth.requestMatchers("/api/users").hasRole("user");
//            //auth.requestMatchers("/api/events").hasRole("user");
//            //auth.requestMatchers("/api/section").hasRole("section");
//            //auth.requestMatchers("").hasAnyRole("admin", "user", "section");  //change roles?
//            //auth.requestMatchers("").hasRole("admin");
//        })
//                .formLogin()
//                //.loginPage("http://localhost:3000/login")
//                .loginPage("/login")
//                .successForwardUrl("/uspeh")
//                .and()
//                .build();
//    }
//
//}

//
//package com.example.ticketing.config;
//
//import com.example.ticketing.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//@EnableWebSecurity
//public class WebConfig {
//
//    private final UserService userService;
//
//    @Autowired
//    public WebConfig(UserService userService) {
//        this.userService = userService;
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public UserDetailsService userDetailsService() {
//        return userService;
//    }
//
//    @Bean
//    public DaoAuthenticationProvider authenticationProvider() {
//        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
//        provider.setUserDetailsService(userDetailsService());
//        provider.setPasswordEncoder(passwordEncoder());
//        return provider;
//    }
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http.csrf().disable()
//                .authorizeRequests(authorizeRequests ->
//                        authorizeRequests
//                                .requestMatchers("").permitAll()
//                                .requestMatchers("/api/users/register", "/api/sections/register").permitAll()
//                                .requestMatchers("/api/users").hasRole("user")
//                                .requestMatchers("/api/events").hasRole("user")
//                                .requestMatchers("/api/section").hasRole("section")
//                                //.requestMatchers("/**").hasAnyRole("admin", "user", "section")
//                )
//                .formLogin(formLogin ->
//                        formLogin
//                                .loginPage("/login")
//                                //.successForwardUrl("/uspeh")
//                )
//                .logout(logout ->
//                        logout
//                                .logoutUrl("/logout")
//                                .logoutSuccessUrl("/")
//                );
//        return http.build();
//    }
//
//}

//
//
//import com.example.ticketing.security.CustomUserDetailsService;
//import com.example.ticketing.service.UserService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//
//
//@Configuration
//public class WebConfig {
//
//    UserDetailsService userDetailsService;
//
//    public WebConfig(CustomUserDetailsService userDetailsService) {
//        this.userDetailsService = userDetailsService;
//    }
//
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
//        return authenticationConfiguration.getAuthenticationManager();
//    }
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http.cors().and().csrf().disable();
//        http.authorizeRequests()
//                .requestMatchers("/", "/home", "/login", "/register", "auth/authenticate").permitAll()
//                .requestMatchers("/api/events").hasRole("user");
////                .antMatchers("/admin").hasAnyAuthority("ADMIN")
////                .antMatchers("/","/home","/generate/test ").hasAnyAuthority("USER","ADMIN");
////        http.formLogin().loginPage("/login");
//        //http.formLogin().loginPage("/auth/authenticate");
////                .defaultSuccessUrl("/")
////                .and().logout();
//
//        return http.build();
//    }
//
////    @Bean
////    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
////        http
////                .formLogin(form -> form.loginPage("/login").permitAll())
////                .logout(logout -> logout.logoutUrl("/logout")
////                        .logoutSuccessUrl("/login"))
////                .authorizeHttpRequests(
////                        auth  -> auth.requestMatchers("/login",
////                                        "/register",
////                                        "/forgotPassword",
////                                        "/images/*",
////                                        "/css/*",
////                                        "/js/*").permitAll()
////                                .requestMatchers("admin").hasAuthority("admin")
////                                .anyRequest().authenticated()
////                ).exceptionHandling(exp -> exp.accessDeniedPage("/accessDenied"))
////                .userDetailsService(customUserDetailsService)
////                .logout(logout->logout.logoutSuccessUrl("/login?logout=true")
////                        .deleteCookies("JSESSIONID"))
////                .rememberMe(rem->rem.key("uniqueAndSecret")
////                        .tokenValiditySeconds(86400));
////
////        return http.build();
////    }
//
//}



package com.example.ticketing.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


//@RequiredArgsConstructor
@Configuration
public class WebSecurityConfig {

//    UserDetailsService userDetailsService;
//
//    public WebConfig(CustomUserDetailsService userDetailsService) {
//        this.userDetailsService = userDetailsService;
//    }

    public static final String SECTION = "section";
    public static final String USER = "user";

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable();
//        http.authorizeRequests().requestMatchers("/", "/home", "/login", "/register").permitAll();
        http.authorizeRequests().requestMatchers("/home", "/login", "/register", "/auth/authenticate", "/api/tickets").permitAll();
//                .requestMatchers("/api/events").hasAuthority(USER);
//                .antMatchers("/admin").hasAnyAuthority("ADMIN")
//                .antMatchers("/","/home","/generate/test ").hasAnyAuthority("USER","ADMIN");
        http.formLogin()
                .loginPage("http://localhost:3000/login")
                .defaultSuccessUrl("http://localhost:3000")
                .and().logout();

        return http.build();
    }


}















