
export default {
	'/api/recommends': () => {
		return Promise.resolve([
      {
        title: '都搞错了，漫威要出柜的英雄其实是她',
        image: require('./movie.jpg'),
        time: '2小时前',
        type: '漫威',
      },
      {
        title: '都搞错了，漫威要出柜的英雄其实是她',
        image: require('./movie.jpg'),
        time: '2小时前',
        type: '漫威',
      },
    ]);
	}
}
