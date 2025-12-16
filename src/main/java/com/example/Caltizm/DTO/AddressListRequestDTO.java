package com.example.Caltizm.DTO;

import lombok.Data;

import java.util.List;

@Data
public class AddressListRequestDTO {
    private List<AddressRequestDTO2> addresses;
    private List<Long> deleteIds;
}
