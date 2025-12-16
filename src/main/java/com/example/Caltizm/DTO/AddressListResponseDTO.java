package com.example.Caltizm.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class AddressListResponseDTO {
    private boolean success;
    private List<AddressResponseDTO> addresses;
}