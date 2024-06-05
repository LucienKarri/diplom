package com.transportsolution.transportsolution.repository;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchRequest {
    private Integer Id;

    private Integer brandId;

    private Integer minPrice;
    private Integer maxPrice;

    private Integer fuel;
    private Integer transmission;
}
