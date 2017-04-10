window.onload = function(){

	

	var sdSlider = (function(){
		this.sdObject = {}
		var obj = this.sdObject;

		this.initObjVars = function(){			
			obj.mainWrapper = document.getElementsByClassName("kz-slider")[0];
			obj.leftSlide = obj.mainWrapper.getElementsByClassName("slide-left")[0];
			obj.rightSlide = obj.mainWrapper.getElementsByClassName("slide-right")[0];
			obj.leftSlide.img = obj.leftSlide.getElementsByTagName('img')[0];
			obj.rightSlide.img = obj.rightSlide.getElementsByTagName('img')[0];
			obj.separator = {};
		}();

		this.setSlideImages = function(){
			obj.leftSlide.img.style.width = obj.mainWrapper.clientWidth + "px";
			obj.leftSlide.img.style.height = obj.mainWrapper.clientHeight + "px";
			obj.rightSlide.img.style.width = obj.mainWrapper.clientWidth + "px";
			obj.rightSlide.img.style.height = obj.mainWrapper.clientHeight + "px";
		};

		this.initSeparator = function(){			
			obj.separator.target = document.getElementsByClassName("kz-separator")[0];
			obj.separator.target.width = parseInt(obj.separator.target.getAttribute('data-width'));
			obj.separator.target.halfWidth = obj.separator.target.width / 2;
			obj.separator.target.style.width = obj.separator.target.width + "px";
			obj.separator.target.style.marginLeft = -(obj.separator.target.halfWidth) + "px";
		}();

		this.checkSeparatorPosition = function(mousePosLeft){
			if(mousePosLeft >= 0 ){
				obj.separator.target.style.left = mousePosLeft + "px";
				obj.leftSlide.style.width = mousePosLeft + "px";
			}else if (mousePosLeft < obj.separator.target.halfWidth){
				obj.separator.target.style.left = obj.separator.target.halfWidth + "px";
				obj.leftSlide.style.width = obj.separator.target.halfWidth + "px";
				obj.separator.pressed = false;
			}
			if(mousePosLeft > obj.mainWrapper.clientWidth){
				obj.separator.target.style.left = obj.mainWrapper.clientWidth - obj.separator.target.halfWidth + "px";
				obj.leftSlide.style.width = obj.mainWrapper.clientWidth - obj.separator.target.halfWidth + "px";
				obj.separator.pressed = false;
			}		
		};

		this.initEvents = function(){
			obj.separator.target.addEventListener('mousedown',function(ev){
				obj.separator.pressed = true;
			});
			obj.mainWrapper.addEventListener('mouseup',function(ev){
				obj.separator.pressed = false;
			});
			obj.separator.target.addEventListener('mouseout',function(ev){
				if(!obj.separator.pressed){
					obj.separator.pressed = false;
				}		
			});
			obj.mainWrapper.addEventListener('mousemove',function(ev){
				var wrapperOffset = obj.mainWrapper.offsetLeft,
					mousePosLeft = ev.clientX - wrapperOffset;
				if(obj.separator.pressed){		
					checkSeparatorPosition(mousePosLeft);
				}	
			});	
			window.addEventListener('mouseup',function(ev){
				obj.separator.pressed = false;
			});
			window.addEventListener('resize',function(){
				setSlideImages();
			});
		};

		this.setSlideImages();
		this.initEvents();

	})();	
};