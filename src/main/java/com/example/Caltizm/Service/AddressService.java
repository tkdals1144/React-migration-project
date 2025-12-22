package com.example.Caltizm.Service;

import com.example.Caltizm.DTO.*;
import com.example.Caltizm.Repository.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AddressService {
    private final AddressRepository addressRepository;

    public AddressListResponseDTO syncAddresses(
            AddressListRequestDTO request,
            Long userId
    ) {
        System.out.println(request.getDeleteIds());

        // 1. 삭제 처리
        if (request.getDeleteIds() != null) {
            for (Long deleteId : request.getDeleteIds()) {
                addressRepository.deleteById(deleteId);
            }
        }

        // 2. 추가 / 수정 처리
        for (AddressRequestDTO2 dto : request.getAddresses()) {
            dto.setUserId(userId);

            if (dto.getAddressId().startsWith("TEMP")) {
                addressRepository.insert(dto);
            } else {
                addressRepository.update(dto);
            }
        }

        // 3. 최종 주소 목록 조회
        List<AddressResponseDTO> finalAddresses =
                addressRepository.findByUserId(userId);

        return new AddressListResponseDTO(true, finalAddresses);
    }
}
