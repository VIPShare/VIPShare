
export default {
  '/api/tops': () => {
    return Promise.resolve([
      {
        id: 1,
        title: '1都搞错了，漫威要出柜的英雄其实是她',
        image: require('./img/1.jpg'),
      },
      {
        id: 2,
        title: '2都搞错了，漫威要出柜的英雄其实是她',
        image: require('./img/2.jpg'),
      },
      {
        id: 3,
        title: '3都搞错了，漫威要出柜的英雄其实是她',
        image: require('./img/3.jpg'),
      },
      {
        id: 4,
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
            id: 6,
            title: '都搞错了，漫威要出柜的英雄其实是她',
            image: require('./movie.jpg'),
            time: '2小时前',
            type: '漫威',
          },
          {
            id: 7,
            title: '都搞错了，漫威要出柜的英雄其实是她',
            image: require('./movie.jpg'),
            time: '2小时前',
            type: '漫威',
          },
          {
            id: 8,
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
          id: 1,
          title: '都搞错了，漫威要出柜的英雄其实是她',
          image: require('./movie.jpg'),
          time: '2小时前',
          type: '漫威',
        },
        {
          id: 2,
          title: '都搞错了，漫威要出柜的英雄其实是她',
          image: require('./movie.jpg'),
          time: '2小时前',
          type: '漫威',
        },
        {
          id: 3,
          title: '都搞错了，漫威要出柜的英雄其实是她',
          image: require('./movie.jpg'),
          time: '2小时前',
          type: '漫威',
        },
        {
          id: 4,
          title: '都搞错了，漫威要出柜的英雄其实是她',
          image: require('./movie.jpg'),
          time: '2小时前',
          type: '漫威',
        },
        {
          id: 5,
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
  },
  '/api/recommends/{id}': ({ urlparams }) => {
    return Promise.resolve({
      id: urlparams.id,
      title: '都搞错了，漫威要出柜的英雄其实是她',
      date: '2017年05月07日',
      source: '巴塞电影',
      author: '糯木',
      image: require('./movie.jpg'),
      content: (
        `<div class="article-content">
            <div><span>想必各位已经听说了《银河护卫队2》里加入同志角色的新闻，不过这里要提醒一下，别被标题党忽悠了，导演詹姆斯·古恩只是含糊其辞地表达了自己对LGBT角色的猜测，压根没说《银护2》中真有同志角色。</span></div><div><br contenteditable="false"></div><div>这波烟雾弹让大家都搞混了目标，MCU（漫威电影宇宙）中的确即将出现同志超级英雄，但不是在《银护2》，而是在这里。↓</div><div><div class="image-wrapper activeElement" contenteditable="false"><img src="http://img.moviebase.cn/img/art/2017/05/2079f72a352d4b0db9ea97523fb2b2ea.JPG@!1080" data-original="http://img.moviebase.cn/img/art/2017/05/2079f72a352d4b0db9ea97523fb2b2ea.JPG@!1080" data-width="988" data-height="494" class="lazy small" contenteditable="false" style="opacity: 1;"><div class="image-caption" contenteditable="true" placeholder="图片备注" style="-webkit-user-modify: read-only;">Debrii（左）与松鼠女孩（右）<br contenteditable="false"></div></div></div><div>漫威正与ABC共同开发的超级英雄美剧New Warriors（暂译《新勇士》），Freeform预定10集，每集30分钟，将于2018年播出。近日，该系列执行制片人Kevin Biegel在接受《今日美国》采访时公开表示，新勇士成员Debrii将是一名个性骄傲又诙谐幽默的黑人女同角色。她将成为MCU首个公开出柜的同志超英。</div><div><div class="image-wrapper" contenteditable="false"><img src="http://img.moviebase.cn/img/art/2017/05/6de50607aeaf4b359a26bef0f9f8de3e.JPG@!1080" data-original="http://img.moviebase.cn/img/art/2017/05/6de50607aeaf4b359a26bef0f9f8de3e.JPG@!1080" data-width="450" data-height="191" class="lazy small" contenteditable="false" style="opacity: 1;"><div class="image-caption" contenteditable="true" placeholder="图片备注" style="-webkit-user-modify: read-only;"><br contenteditable="false"></div></div></div><div><div class="image-wrapper" contenteditable="false"><img src="http://img.moviebase.cn/img/art/2017/05/d92897d458b24d87b1c752f019645da7.JPG@!1080" data-original="http://img.moviebase.cn/img/art/2017/05/d92897d458b24d87b1c752f019645da7.JPG@!1080" data-width="442" data-height="350" class="lazy small" contenteditable="false" style="opacity: 1;"><div class="image-caption" contenteditable="true" placeholder="图片备注" style="-webkit-user-modify: read-only;">Debrii，超能力是控制金属碎片</div></div></div><div>这支队伍大家可能不太熟悉，但漫威主宇宙的“内战”事件你一定知道，《美国队长3》所选取的就是这段剧情。而“内战”导火索——斯坦福德事件，主角正是这支少年战团。</div><div><br contenteditable="false"></div><div>这是一支非常年轻化的超英战队，可算是漫威旗下的“高能少年团”，公众面前是一群真人秀明星，实际上则是利用这种形式惩奸除恶。</div><div><br contenteditable="false"></div><div>不过少年团在一次追捕反派硝化人时，硝化人意外自爆，炸平了斯坦福德，平民死伤无数，政府开始将《超级英雄注册法案》提上议程，此后才引发了英雄站队和内战事件。新勇士的故事可算是“内战”前传，不知道擅长埋线搭桥的漫威，将来会不会将这些串起来。</div><div><div class="image-wrapper" contenteditable="false"><img src="http://img.moviebase.cn/img/art/2017/05/acb6698b9b8a45b9a6a851427aa40615.jpg@!1080" data-original="http://img.moviebase.cn/img/art/2017/05/acb6698b9b8a45b9a6a851427aa40615.jpg@!1080" data-width="508" data-height="583" class="lazy small" contenteditable="false" style="opacity: 1;"><div class="image-caption" contenteditable="true" placeholder="图片备注" style="-webkit-user-modify: read-only;">斯坦福德事件</div></div></div><div>漫威内部人士称，同志角色在电影中的缺席，是漫威影业担心会因此失去诸如俄罗斯和中国这样的大票仓。而电视剧是一种更灵活的形式，能够测试市场对这种变化的接受程度和经济效益。</div><div><br contenteditable="false"></div><div>《新勇士》剧集定位为喜剧，主角们年纪都不大，目标受众明显偏向青少年。Debrii这个角色，更像是一次拉拢年轻LGBTQ观众的试水。</div><div><br contenteditable="false"></div><div style="text-align: center;"><b>【漫威电影 — 隐去的同志】</b></div><div><br contenteditable="false"></div><div>关于这个新角色的属性，黑人，女性，同志，政治正确得不要太明显。但这依然让一些漫威迷鼓掌买单，仿佛曙光在前。</div><div><br contenteditable="false"></div><div>粉丝们大惊小怪也是情有可原，众所周知漫威与DC两家向来一有机会就正面杠，没有机会创造机会也要杠（比如《美国队长：英雄内战》对撞《蝙蝠侠大战超人》），但却唯独在LGBTQ这个问题上，无论DC如何大刀阔斧，恨不得部部皆有同，漫威这边依然雷打不动，坚持走“no homo”的路线，甚至因此被一些影迷扣上“反同”大帽。</div><div><br contenteditable="false"></div><div>说到这里，漫威漫画部要喊冤了，其实漫画里很早就开始出现过LGBTQ角色，只是电影不予呈现，这就尴尬了，所以有时候你与这些角色间最遥远的距离，不是他们不存在，而是他/她站在你面前，你却不知道他/她是gay。</div><div><br contenteditable="false"></div><div>据传前不久刚杀青的漫威电影《黑豹》中，就有意删减了一个酷儿角色。</div><div><div class="image-wrapper" contenteditable="false"><img src="http://img.moviebase.cn/img/art/2017/05/2873ec3970b140cdb79c7fb700ef10d3.JPG@!1080" data-original="http://img.moviebase.cn/img/art/2017/05/2873ec3970b140cdb79c7fb700ef10d3.JPG@!1080" data-width="680" data-height="607" class="lazy small" contenteditable="false" style="opacity: 1;"><div class="image-caption" contenteditable="true" placeholder="图片备注" style="-webkit-user-modify: read-only;">漫画中的Ayo与Aneka</div></div></div><div>国王的贴身保镖Ayo在漫画中实际上有一位同性恋人Aneka，当初《黑豹》阵容名单中出现Ayo时，一众漫迷对Ayo和Aneka的关系燃起期待，但是很快漫威官方就出来澄清：电影中两人并无任何暧昧关系。</div><div><br contenteditable="false"></div><div>一时间失落的影迷在推特上将#LetAyoHaveAGirfriend （让Ayo有个女朋友）的tag刷上热门。</div><div><div class="image-wrapper" contenteditable="false"><img src="http://img.moviebase.cn/img/art/2017/05/b627416705f64622aa92fd715793b566.jpg@!1080" data-original="http://img.moviebase.cn/img/art/2017/05/b627416705f64622aa92fd715793b566.jpg@!1080" data-width="640" data-height="480" class="lazy small" contenteditable="false" style="opacity: 1;"><div class="image-caption" contenteditable="true" placeholder="图片备注" style="-webkit-user-modify: read-only;"><br contenteditable="false"></div></div></div><div>也许因为长期的不娶何撩，迷妹们对漫威LGBTQ类角色的呼声非常高涨，高到不是同志的也大有掰成同志之势，去年《美国队长3》上映后，#GiveCaptainAmericaABoyfriend （给美国队长一个男朋友）这个话题就霸占热门标签头条位置足足两天，我想漫威已经收到足够多的@了。</div><div><br contenteditable="false"></div><div>包括此前赚足眼泪的《金刚狼3》，也依旧有你没发现的同志角色。</div><div><br contenteditable="false"></div><div>年迈的狼叔拼尽全力护送小劳拉到“伊甸园”庇护所后，发现这里聚集的全是逃出来的变种人孩子，这些孩子中有一个看似小领队的男孩，技能爆发时徒手抄起一辆装甲车。</div><div><div class="image-wrapper" contenteditable="false"><img src="/uread/images/loading.gif" data-original="http://img.moviebase.cn/img/art/2017/05/3219484cabe74fadbcc3205acde56d7b.jpg@!1080" data-width="1022" data-height="575" class="lazy small" contenteditable="false"><div class="image-caption" contenteditable="true" placeholder="图片备注" style="-webkit-user-modify: read-only;">Rictor（右一）</div></div></div><div>没错，就是他。名叫Rictor，是一位变种人超英，从1987年登场一直存活至今，并在2009年奉献了漫威漫画中首例同性超英接吻，之后便毫无障碍地走上了出柜交男友的道路。</div><div><div class="image-wrapper" contenteditable="false"><img src="/uread/images/loading.gif" data-original="http://img.moviebase.cn/img/art/2017/05/e0ad04793450441bb5b2d59fc3a58807.jpg@!1080" data-width="450" data-height="279" class="lazy small" contenteditable="false"><div class="image-caption" contenteditable="true" placeholder="图片备注" style="-webkit-user-modify: read-only;">Rictor与好基友Shatterstar的kiss</div></div></div><div>电影中出现的只是少年Rictor，戏份非常少，性取向自然更无关紧要，这里不是避而不谈，而是没有必要。毕竟是把泛性恋反英雄角色死侍玩得这么嗨的21世纪福斯，这种事还不需要LGBTQ粉丝亲自来@。</div><div><br contenteditable="false"></div><div>另一方面，X战警的漫画系列本身的创作根基和价值输出就是关乎少数群体的，漫画中甚至同性婚礼都画过，素材要多少有多少，只看会不会搬上荧幕。</div><div><br contenteditable="false"></div><div style="text-align: center;"><b>【DC电影 — 鲜明的同志】</b></div><div><br contenteditable="false"></div><div>当漫威仍在瞻前顾后的时候，DC的开放和“正确”程度已经甩前者几条街。</div><div><br contenteditable="false"></div><div>今年6月即将上映的《神奇女侠》，编剧Greg Rucka已确认神奇女侠是一位酷儿。</div><div><div class="image-wrapper" contenteditable="false"><img src="/uread/images/loading.gif" data-original="http://img.moviebase.cn/img/art/2017/05/0ede3a49c3a44a94bea5f7818adde193.jpg@!1080" data-width="800" data-height="761" class="lazy small" contenteditable="false"><div class="image-caption" contenteditable="true" placeholder="图片备注" style="-webkit-user-modify: read-only;">《神奇女侠》</div></div></div><div>DC连载剧集《闪电侠》，看着看着发现一位警官同志喜得未婚夫。</div><div><div class="image-wrapper" contenteditable="false"><img src="/uread/images/loading.gif" data-original="http://img.moviebase.cn/img/art/2017/05/ffae3c9083b74625abd817e49e7a0eb0.jpg@!1080" data-width="559" data-height="314" class="lazy small" contenteditable="false"><div class="image-caption" contenteditable="true" placeholder="图片备注" style="-webkit-user-modify: read-only;">《闪电侠》</div></div></div><div>《哥谭》第三季，乖张狠厉的黑帮大佬企鹅人就这么弯了，爱上了高智商罪犯谜语人。</div><div><div class="image-wrapper" contenteditable="false"><img src="/uread/images/loading.gif" data-original="http://img.moviebase.cn/img/art/2017/05/6b84a251a4ce48908f02c38bbd0c2952.png@!1080" data-width="662" data-height="423" class="lazy small" contenteditable="false"><div class="image-caption" contenteditable="true" placeholder="图片备注" style="-webkit-user-modify: read-only;">《哥谭》企鹅人</div></div></div><div>其实早在2009年DC漫改电影《守望者》中，就出现了一对女同情侣，然而最终双双被反同分子杀死，讽刺社会对同性恋的厌恶令人不寒而栗。</div><div><div class="image-wrapper" contenteditable="false"><img src="/uread/images/loading.gif" data-original="http://img.moviebase.cn/img/art/2017/05/c2363b75125b4f308da67eaceda9bca4.jpg@!1080" data-width="800" data-height="324" class="lazy small" contenteditable="false"><div class="image-caption" contenteditable="true" placeholder="图片备注" style="-webkit-user-modify: read-only;"><span>女英雄“侧影”与女友，构图致敬了摄影作品《胜利之吻》，然而两人结局却是彻底的失败</span></div></div></div><div>最后，当主角没法“同”的时候，那么哪怕找个背景板也要“同”，且看《蝙蝠侠大战超人：正义黎明》导演剪辑版中的这个镜头。</div><div><div class="image-wrapper" contenteditable="false"><img src="/uread/images/loading.gif" data-original="http://img.moviebase.cn/img/art/2017/05/9736fa7f2dc143e29aaa9553c074d680.png@!1080" data-width="749" data-height="367" class="lazy small" contenteditable="false"><div class="image-caption" contenteditable="true" placeholder="图片备注" style="-webkit-user-modify: read-only;">《BVS》导演剪辑版</div></div></div><div>DC，你真的很拼。</div><div><br contenteditable="false"></div><div style="text-align: center;"><b>【看得见的是同志，看不见的是政治】</b></div><div><br contenteditable="false"></div><div>自2015年6月26日美国最高法院裁定同性婚姻合法化，2016-2017年的同志电影在数量、质量和关注度上都大有“不要怂就是干”的架势。</div><div><br contenteditable="false"></div><div>主流影视和奖项方面，《月光男孩》在奥斯卡上的成绩就是政治正确的产物，尽管影片本身并没有探讨任何的政治正确；另一部系列大作《星际迷航：超越星辰》中索性将苏鲁的角色写成同志，一个月前还入围了美国同性恋者反诋毁联盟媒体奖（GLAAD Media Awards）；跨性别喜剧《透明家庭》第三季继续入围艾美或金球等奖项。</div><div><div class="image-wrapper" contenteditable="false"><img src="/uread/images/loading.gif" data-original="http://img.moviebase.cn/img/art/2017/05/3db26e77ed4344cd808a5fbe824ca216.png@!1080" data-width="800" data-height="400" class="lazy small" contenteditable="false"><div class="image-caption" contenteditable="true" placeholder="图片备注" style="-webkit-user-modify: read-only;">《透明家庭》第三季</div></div></div><div>独立电影方面，今年的圣丹斯电影节，就有改编自同志小说的电影《请以你的名字呼唤我》口碑爆表，去年的美国独立精神奖有克里斯·凯利的《其他人》提名最佳处女作，戛纳的评审团大奖则有泽维尔·多兰的《只是世界尽头》，这些电影的主角恰好都是同志。</div><div><div class="image-wrapper" contenteditable="false"><img src="/uread/images/loading.gif" data-original="http://img.moviebase.cn/img/art/2017/05/599e9adcc68d429f8a1a052015e768b8.jpg@!1080" data-width="800" data-height="435" class="lazy small" contenteditable="false"><div class="image-caption" contenteditable="true" placeholder="图片备注" style="-webkit-user-modify: read-only;">《以你的名字呼唤我》</div></div></div><div>同志电影似乎进入了黄金时代。随着各种政治正确的奖项引流，越来越多的同志电影进入观众视野，向来“恐同”的好莱坞也不得不左脚踩右脚地跟上步伐，漫改电影的几支大军中，DC看似率先拥抱了这个时代。</div><div><br contenteditable="false"></div><div>但它的拥抱方式却显得非常“急”，甚至不惜添加漫画中本没有的同性情节（如：企鹅人）。漫威和DC，一个过于保守，一个急于求成。</div><div><br contenteditable="false"></div><div>这就好比众人围坐在一张桌子前，桌上摆了个政治正确的大蛋糕，一个孩子开始不顾形象大快朵颐，一个孩子却小心翼翼地先用手指戳一戳，环顾四周观察一轮长辈们的神色。</div><div><br contenteditable="false"></div><div>其实这块蛋糕吃不吃、什么时候吃，已经不由漫威说了算，我们总说“个人发展也要顺应历史潮流”，电影何尝不是，商业大片中的LGBT角色存在与否其实并不由艺术创作决定，而跟社会需求和市场风向有关。</div><div><br contenteditable="false"></div><div>如果独立电影人单纯想拍一部同志电影，那他大可不必在意收益，去拍就是了，这对于创作本身根本不是问题。但放到了商业片中，就变成了问题。现代政治和资本对电影艺术的影响太深，在标榜最自由开放的好莱坞也尤为严重，政治说要有黑人，就有了黑人。政治说要有gay，就有了gay。</div><div><br contenteditable="false"></div><div>我们不禁思考，一窝蜂地在电影作品中加入同志角色是否矫枉过正？角色的性取向在一些作品中重要吗？为了创建一个多元化兼容性的自由社会，究竟是LGBTQ绑架了艺术，还是政治利用了LGBTQ？</div><div><div class="image-wrapper" contenteditable="false"><img src="/uread/images/loading.gif" data-original="http://img.moviebase.cn/img/art/2017/05/59cdfc5e5f3b45688f0cabd83b593060.jpg@!1080" data-width="800" data-height="533" class="lazy small" contenteditable="false"><div class="image-caption" contenteditable="true" placeholder="图片备注" style="-webkit-user-modify: read-only;">《月光男孩》</div></div></div><div>看得见的是同志，看不见的是政治。看得见的是电影，看不见的是社会。如今LGBTQ文化的流行只是历史发展的反映，但当我们过度地用“政治正确”来归类和评价电影的时候，我们评价的还是电影本身吗。十年二十年后，浪潮总会过去，标签会淡化和摘除，那时你还会因为这个标签而讨厌或喜欢这部电影吗。</div><div><br contenteditable="false"></div><div>未来的影视作品中，出现性取向不同的角色只会趋于常态，就跟出现肤色不同、职业不同、社会地位不同的角色一样，“同志电影”这个分类会从稀缺，到井喷，最后去往模糊，你会为了“异性恋电影”单独加一个标签吗？不会吧，除非你有强迫症式的归纳癖。</div><div><br contenteditable="false"></div><div>所以不妨撕去政治正确的标签，剥开LGBTQ的外壳，回归到角色是如何被他周围的一切所影响的这件事上，你会发现，电影里有没有同志并不是一件值得纠结的事。</div><div><br contenteditable="false"></div><div>因为不管是不是同志，他都是作为一个人，于光影的世界中，向你袒露他的喜怒悲欢，寻求那一丝或许你我都需要的共情。电影的初心本就当如此吧，不是吗？</div>
        </div>`
      ),
    });
  }
}
