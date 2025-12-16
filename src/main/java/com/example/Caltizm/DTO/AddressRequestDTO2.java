package com.example.Caltizm.DTO;

import lombok.Data;

@Data
public class AddressRequestDTO2 {
    private String addressId;
    private Long userId;
    private String address;
    private String detail;
    private String zipCode;
}
