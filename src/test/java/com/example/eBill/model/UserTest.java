package com.example.eBill.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    @Test
    void testIdCorrect(){
        User user1 = new User();
        user1.setId(1L);
        assertEquals(user1.getId(),1L);
    }
    @Test
    void testIdIncorrect(){
        User user1 = new User();
        user1.setId(1L);
        assertNotEquals(user1.getId(),2L);
    }

    @Test
    void testNameCorrect(){
        User user1 = new User();
        user1.setName("Riste");
        assertEquals(user1.getName(),"Riste");
    }

    @Test
    void testNameIncorrect(){
        User user1 = new User();
        user1.setName("Riste");
        assertNotEquals(user1.getName(),"Milan");
    }

    @Test
    void testPasswordCorrect(){
        User user1 = new User();
        user1.setPassword("123456");
        assertEquals(user1.getPassword(), "123456");
    }

    @Test
    void testPasswordIncorrect(){
        User user1 = new User();
        user1.setPassword("123456");
        assertNotEquals(user1.getPassword(),"12345");
    }

    @Test
    void testUsernameCorrect(){
        User user1 = new User();
        user1.setUsername("riki");
        assertNotEquals(user1.getPassword(),"miki");
    }

    @Test
    void testUsernameIncorrect(){
        User user1 = new User();
        user1.setUsername("riki");
        assertNotEquals(user1.getPassword(),"miki");
    }


    @Test
    void testEmailCorrect(){
        User user1 = new User();
        user1.setEmail("riki@test.si");
        assertEquals(user1.getEmail(),"riki@test.si");
    }

    @Test
    void testEmailIncorrect(){
        User user1 = new User();
        user1.setEmail("riki@test.si");
        assertNotEquals(user1.getEmail(),"miki@test.si");
    }

    @Test
    void testRoleCorrect(){
        User user1 = new User();
        user1.setRole("ADMIN");
        assertEquals(user1.getRole(),"ADMIN");
    }

    @Test
    void testRoleIncorrect(){
        User user1 = new User();
        user1.setRole("ADMIN");
        assertNotEquals(user1.getRole(),"USER");
    }

    @Test
    void testCityCorrect(){
        User user1 = new User();
        user1.setCity("Koper");
        assertEquals(user1.getCity(), "Koper");
    }

    @Test
    void testCityIncorrect(){
        User user1 = new User();
        user1.setCity("Koper");
        assertNotEquals(user1.getCity(), "Ljubljana");
    }

    @Test
    void testStreetCorrect(){
        User user1 = new User();
        user1.setStreet("Izolska cesta");
        assertEquals(user1.getStreet(), "Izolska cesta");
    }

    @Test
    void testStreetIncorrect(){
        User user1 = new User();
        user1.setStreet("Trg Brolo");
        assertEquals(user1.getStreet(), "Trg Brolo");
    }

    @Test
    void testCityCodeCorrect(){
        User user1 = new User();
        user1.setCityCode("6000");
        assertEquals(user1.getCityCode(), "6000");
    }

    @Test
    void testCityCodeIncorrect(){
        User user1 = new User();
        user1.setCityCode("6000");
        assertNotEquals(user1.getCityCode(), "1000");
    }
}