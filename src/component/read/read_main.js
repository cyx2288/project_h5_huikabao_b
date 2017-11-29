var reciteNum = {

    run: function (num) {

        num = (num*1).toString();//字符串

        var thisLength = num.length;

        var reciteList = [];//音频播放顺序

        for (var thisNum = 0; thisNum < thisLength; thisNum++) {//thisNum用来记录现在位置的变量

            var thisNumPosition;

            if (num.indexOf('.') > -1) {//如果有小数点

                thisNumPosition = num.indexOf('.') - thisNum;//现在的位置=小数点的位置-现在的计数位置

            }

            else {//如果没有小数点

                thisNumPosition = thisLength - thisNum;//现在为止=长度-此时数的位置

            }

            var thisN = num.substr(thisNum, 1);//截取当前位置的数


            (function () {

                if(thisN=='.'){//点变成音频

                    reciteList.push('DIAN');

                }

                else{//数字返回数

                    reciteList.push(thisN);

                }


            })();


            (function () {//分位变换

                if(thisN!=0) {

                    if (thisNumPosition != 0 && thisNumPosition % 4 == 0) {

                        reciteList.push('QIAN')

                    }

                    else if (thisNumPosition % 4 == 3) {

                        reciteList.push('BAI')

                    }

                    else if (thisNumPosition % 4 == 2) {

                        reciteList.push('SHI')

                    }

                }

            })();

            (function () {//万位亿位

                if (thisNumPosition == 5) {

                    reciteList.push('WAN')

                }

                else if (thisNumPosition == 9) {

                    reciteList.push('YYI')

                }

            })()

        }

        reciteList.push('YUAN');//含重复零的数组

        var activeList=[];//去零

        var iNewList=0;//新数组计数


        //去零，整理不需要的报数
        (function () {

            for(var i=0;i<reciteList.length;i++){

                if(i != reciteList.length) {//最后一位没有比对需求

                    var nextNum=reciteList[i + 1];

                    if (

                        !(
                            reciteList[i] == 0//此时的数位上是0

                            &&

                            (nextNum == 0 || (nextNum == 'DIAN' && i != 0) || nextNum == 'YUAN' || nextNum == 'WAN' || nextNum == 'YYI')//下一位上是0或者点或万或亿

                        )

                        && !(

                            reciteList[i] == 'WAN' && activeList[iNewList - 1] == 'YYI'//此时的数=万以及新数组的上一位为亿，则略过

                        )


                        && !(

                            i == 0 && reciteList[i] == 1 && nextNum == 'SHI'//一十去掉前面的一

                        )

                    ) {

                        activeList.push(reciteList[i]);//新数组

                        iNewList++;//新数组计数

                    }

                }

            }


            /*如果只有元的时候，前面加一个零*/

            if(activeList.length==1&&activeList[0]=='YUAN'){

                activeList.unshift('0')

            }


        })();

        this.l.push(activeList);//保存播报的列表，全局变量



        /*音频绑定事件*/
        if(this.o){

            var thisAudioPosition=1;//播报单个字位置

            var allEle=document.getElementById('all_audio').getElementsByTagName('audio');//所有音频文件

            for(var i=0;i<allEle.length;i++)

            {

                allEle[i].addEventListener('ended',function () {//所有音频加结束监听

                    if(thisAudioPosition<this.l[0].length) {//队列不到底才播报

                        //document.getElementById('all_audio_' + this.l[0][thisAudioPosition++]).play();//播报队列此时的音频
                        audioPlay(thisAudioPosition++);

                    }

                    else{//队列到底就停止播报

                        thisAudioPosition=1;//播报位置初始化

                        this.l.shift();/*删除第一个播报队列*/

                        if(this.l.length>0){//如果此时播报队列里有

                            audioPlay(0);//继续播报

                        }

                        else{

                            this.b=1;//打开播报开关

                        }


                    }

                }.bind(this),false)

            }

            this.o=0;//自锁

        }

        function audioPlay(num) {//自动播放方法

            document.getElementById('all_audio_' + reciteNum.l[0][num]).play();

        }

        if(this.b){

            audioPlay(0);//自动播放第一个

            this.b=0;

        }
        
    },

    o:1,//自锁变量，加监听

    l:[],/*所有的播报列表*/

    b:1/*是否在播报中的开关，开是可以播报（没有播报中），关是不可播报（播报中）*/

};
