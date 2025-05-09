export type Price_by_unit = {
  type: string; // ex) 104A/74A
  units: number; // ex) 82
  price: number; // ex) 750000
};

/*
{
  "104A/74A" : {
    "units": 82;
    "price": 750000;
  },
  "119A/84A" : {
    "units": 230;
    "price": 780000;
  },
  "120A/84A" : {
    "units": 230;
    "price": 780000;
  },
}
*/

export type Risk = {
  "전매제한 여부": boolean | null;
  "전매제한 기간": string | null; // x년으로 작성
  "실거주 의무 여부": boolean | null;
  "실거주 의무 기간": string | null; // x년으로 작성
  "역세권": string | null;
  "학군": string | null; 
  "착공일": string | null; // xxxx년 x월 xx일로 작성 or 확인필요
  "규제 지역 여부": boolean | null;
  "계약금 비율": number | null; // 퍼센트 숫자만 입력
}

export type Subdivision = {
  id?: string | null; // 고유 식별자
  created_at?: string | null; // 생성 시간

  // Profile Info
  subdivision_name: string | null; // 사업명
  area: string | null; // 사업지/권역
  address_category: string | null; // 주소 카테고리 (subregions)

  // Basic Info
  title: string | null; // 사업병
  property_type: string | null; // 건축물용도
  price: number | null; // 가격
  description?: string | null; // 설명
  address: string | null; // 주소

  // Property Info
  units_number: number | null; // 전체 세대수
  building_number: number | null; // 동 개수
  move_in_date: string | null; // 입주 예정일
  sales_start_date: string | null; // 분양 시작일
  size: Price_by_unit[] | null; // 공급/전용(m^2)
  up_floor: number | null; // 지상 층수
  down_floor: number | null; // 지하 층수
  parking: string | null; // 주차(평균 주차대수)
  building_coverage_ratio: string | null; // 건폐율(BCR)
  floor_area_ratio: string | null; // 용적율(FAR) xx%로 작성
  land_type: string | null; // 택지 유형 xx%로 작성

  // Company Info
  developer: string | null; // 시행사
  constructor: string | null; // 시공사
  agency: string | null; // 대행사
  trust_company: string | null; // 신탁사
  
  // Detail Info
  is_price_limit: boolean | null; // 분양가 상한제 적용 여부
  is_hot_market: boolean | null; // 투기 과열 지구 여부
  is_adjustment_target: boolean | null; // 조정대상지역 여부
  is_maintenance_target: boolean | null; // 정비사업 대상지역 여부
  is_public_housing_target: boolean | null; // 공공주택지구 여부
  is_private_public_housing_target: boolean | null; // 수도권 내 민영 공동주택지구 여부
  is_public_housing_special_law: boolean | null; // 공공주택 특별법 적용 여부
  amenities: string[] | null; // 편의시설
  communityes: string[] | null; // 커뮤니티
  
  // Tag Info
  tags: boolean[] | null; // 태그 (즉시입주, 전매여부, 다주택 여부) [true, false, false]
  risk: Risk | null; // 위험 태그 (주택 소유 여부, 주택 소유 여부, 주택 소유 여부)
  // Images
  images: string[] | null;
};
