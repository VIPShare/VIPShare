
export default {
	'/api/mine/info': () => {
		return Promise.resolve({
			nick: 'WhatAKitty',
			sex: '男',
      birthday: '1992-09-18',
      address: '浙江省杭州市西湖区',
      email: '104xuqiang@163.com',
		});
	}
}
