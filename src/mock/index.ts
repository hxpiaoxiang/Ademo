/**
 * Mock数据服务
 * 用于模拟API接口数据
 */
import Mock from 'mockjs';

// 随机数据生成规则
const Random = Mock.Random;

// 模拟用户信息
Mock.mock('/api/user/info', 'get', {
  'code': 200,
  'message': 'success',
  'data': {
    'id': '@id',
    'name': '@cname',
    'avatar': Random.image('100x100', '#4A7BF7', '#fff', 'Avatar'),
    'phone': /^1[3-9]\d{9}$/,
    'email': '@email',
    'registerTime': '@datetime'
  }
});

// 模拟申请记录
Mock.mock('/api/application/list', 'get', {
  'code': 200,
  'message': 'success',
  'data|5-10': [{
    'id': '@id',
    'title': '@ctitle(5, 10)',
    'status|1': ['待审核', '已通过', '已拒绝'],
    'submitTime': '@datetime',
    'updateTime': '@datetime'
  }]
});

// 模拟提交申请
Mock.mock('/api/application/submit', 'post', {
  'code': 200,
  'message': 'success',
  'data': {
    'id': '@id',
    'serialNumber': /^\d{14}$/,
    'submitTime': '@now',
    'estimateTime': '@date'
  }
});

export default Mock;