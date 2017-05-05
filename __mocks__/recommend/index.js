
export default {
  '/api/tops': () => {
    return Promise.resolve([
      {
        title: '1都搞错了，漫威要出柜的英雄其实是她',
        image: require('./img/1.jpg'),
      },
      {
        title: '2都搞错了，漫威要出柜的英雄其实是她',
        image: require('./img/2.jpg'),
      },
      {
        title: '3都搞错了，漫威要出柜的英雄其实是她',
        image: require('./img/3.jpg'),
      },
      {
        title: '4都搞错了，漫威要出柜的英雄其实是她',
        image: require('./img/4.jpg'),
      },
    ]);
  },
  '/api/recommends': ({ params }) => {
    const pageNumber = +params.pageNumber;
    if (pageNumber > 2) {
      return Promise.resolve({
        list: [],
        pageinfo: {
          pageNumber: 2,
          pageSize: 5,
        },
      });
    }
    if (pageNumber === 2) {
      return Promise.resolve({
        list: [
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
          {
            title: '都搞错了，漫威要出柜的英雄其实是她',
            image: require('./movie.jpg'),
            time: '2小时前',
            type: '漫威',
          },
        ],
        pageinfo: {
          pageNumber: 2,
          pageSize: 5,
        }
      });
    }
    return Promise.resolve({
      list: [
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
        {
          title: '都搞错了，漫威要出柜的英雄其实是她',
          image: require('./movie.jpg'),
          time: '2小时前',
          type: '漫威',
        },
      ],
      pageinfo: {
        pageNumber: 1,
        pageSize: 5,
      }
    });
  }
}
