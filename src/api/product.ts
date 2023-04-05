import http from '@/utils/request';

const apiProduct = {
  indexList: (params?: GetTest.params) =>
    http.get<GetTest.data>('/tiny-shop/v1/index/index', params)
};

export default apiProduct;
