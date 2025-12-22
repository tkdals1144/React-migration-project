package com.example.Caltizm.Repository;

import com.example.Caltizm.DTO.AddressRequestDTO;
import com.example.Caltizm.DTO.AddressRequestDTO2;
import com.example.Caltizm.DTO.AddressResponseDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
public interface AddressRepository {
    void insert(AddressRequestDTO2 dto);
    void update(AddressRequestDTO2 dto);
    void deleteById(Long addressId); // 🔥 이 줄 추가
    List<AddressResponseDTO> findByUserId(Long userId);
}
