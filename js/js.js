var dom={
    $:function(selector){
        return document.querySelector(selector);
    },
    $$:function(selector){
        return document.querySelectorAll(selector);
    }
};
var fadeObj={
    flashNode:dom.$('#flash'),
    aLeftNode:dom.$('#flash_left'),
    aRightNode:dom.$('#flash_right'),
    spanNodes:dom.$$('#flash .flash_btn span'),
    liNodes:dom.$$('#flash li'),
    fadeOne:null,
    fadeFun:function(curPos,oldPos,num){//num表示动画过程变化的值
        var _this=this;
        window.clearTimeout(_this.fadeOne);
        for(var i=0;i<_this.liNodes.length;i++){//除了curPos,oldPos的li对象直接结束动画
            if(i!=curPos && i!=oldPos){
                _this.liNodes[i].style.opacity=0;
                _this.liNodes[i].style.filter="alpha(opacity=0)";
                _this.liNodes[i].style.display='none';
            }
        }

        if(num==0){//动画开始的时候
            _this.spanNodes[curPos].className="current";
            _this.spanNodes[oldPos].className="block";
            _this.liNodes[curPos].style.opacity=0;
            _this.liNodes[curPos].style.filter="alpha(opacity=0)";
            _this.liNodes[curPos].style.display='block';
        }
        num+=5;
        if(num<=100){//动画中
            //淡入
            _this.liNodes[curPos].style.opacity=num/100;
            _this.liNodes[curPos].style.filter="alpha(opacity="+num+")";
            //淡出
            _this.liNodes[oldPos].style.opacity=(100-num)/100;
            _this.liNodes[oldPos].style.filter="alpha(opacity="+(100-num)+")";
            _this.fadeOne=window.setTimeout(function(){
                _this.fadeFun(curPos,oldPos,num);
            },20);
        }
        else{//动画结束
            this.liNodes[oldPos].style.display="none";
        }
    },
    btnSliderFun:function(){
        var _this=this;
        for(var i=0;i<_this.spanNodes.length;i++){
            _this.spanNodes[i].index=i;
            _this.spanNodes[i].onmouseenter=function(){
                if(this.className=="current")
                {
                    return;
                }
                var curPos=this.index;
                var oldPos;
                for(var i=0;i<_this.spanNodes.length;i++){
                    if(_this.spanNodes[i].className=='current'){
                        oldPos=i;
                        break;
                    }
                }

                _this.fadeFun(curPos,oldPos,0);
            };
        }
    },
    aLeftClickFun:function(){
        var _this=this;
        var oldPos;
        var lastPos=_this.spanNodes.length-1;//最后一个位置
        for(var i=0;i<_this.spanNodes.length;i++){
            if(_this.spanNodes[i].className=="current"){
                oldPos=i;
                break;//跳出循环
            }   
        }
        var curPos=oldPos==0?lastPos:oldPos-1; 

        _this.fadeFun(curPos,oldPos,0);
    },
    aRightClickFun:function(){
        var _this=this;
        var oldPos;
        var lastPos=_this.spanNodes.length-1;//最后一个位置
        for(var i=0;i<_this.spanNodes.length;i++){
            if(_this.spanNodes[i].className=="current"){
                oldPos=i;
                break;//跳出循环
            }   
        }
        var curPos=oldPos==lastPos?0:oldPos+1;

        _this.fadeFun(curPos,oldPos,0);
    },
    init:function(){
        var _this=this;

        _this.btnSliderFun();

        _this.aLeftNode.onclick=function(){
            _this.aLeftClickFun();
        }

        _this.aRightNode.onclick=function(){
            _this.aRightClickFun();
        }

        _this.autoDo=window.setInterval(function(){
            _this.aRightClickFun();
        },3000);
    }
};

fadeObj.init();



var x=window.screen.width;
var y=window.screen.height;
creatDiv()
	
function creatDiv(){
var x1=Math.round(Math.random()*x*10)/10+"px";
var opac=Math.round(Math.random()*10)/10;
var newDiv=document.createElement("div");
newDiv.style.top="0";
newDiv.style.left=x1;
newDiv.style.width="2px";
newDiv.style.height="10px";
newDiv.style.opacity=opac;

document.body.appendChild(newDiv);

t=setTimeout('getDiv()',10)
}	



function getDiv(){
	var alldiv=document.getElementsByTagName("p");
	console.log(alldiv.length)
	for(i=0;i<alldiv.length;i++){
		alldiv[i].style.transition="all 2s";
		alldiv[i].style.webkitTransition="all 2s";
		alldiv[i].style.mozTransition="all 2s";
	    alldiv[i].style.transitionTimingFunction="ease-in";
	    alldiv[i].style.webkitTransitionTimingFunction="ease-in";
	    alldiv[i].style.mozTransitionTimingFunction="ease-in"
		alldiv[i].style.top=y+"px";
		if(alldiv.length>250){
		     document.body.removeChild(alldiv[0]);
			}
		}
	t=setTimeout('creatDiv()',1)
	}
	

