var canvas = document.getElementById("canvasId");
			var ctx = canvas.getContext("2d");
			var ox = 93;
			var oy = 93;
			var or = 75;
			var br = 8;
			var br1=12;
			var val;
			var moveFlag = false;

			function offset(r, d) { //根据弧度与距离计算偏移坐标
				return {
					x: -Math.sin(r - Math.PI) * d,
					y: Math.cos(r- Math.PI) * d
				};
			};

			function draw(n) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.strokeStyle = "rgba(255,255,255,.3)";
				ctx.lineWidth = 12;
				ctx.beginPath();
				ctx.arc(ox, oy, or, 0, 2 * Math.PI, true);
				ctx.stroke();
				ctx.strokeStyle = "#fff";
				ctx.lineWidth = 12;
				ctx.beginPath();
				ctx.arc(ox, oy, or, -0.5 * Math.PI, (n * 2 - 0.5) * Math.PI, false);
				ctx.stroke();
				ctx.fillStyle = "#fff";
				ctx.beginPath();
				var d = offset(n * 2 * Math.PI, or);
				ctx.arc(ox + d.x, oy + d.y, br, 0, 2 * Math.PI, true);
				ctx.fill();
				val=Math.round(n * 100)>0?(Math.round(n * 100)/100*30).toFixed(1):(30+Math.round(n * 100)/100*30).toFixed(1);
				//
				ctx.fillStyle = "rgba(255,255,255,.3)";
				ctx.beginPath();
				ctx.arc(ox + d.x, oy + d.y, br1, 0, 2 * Math.PI, true);
				ctx.fill();
			}

			var on = ("ontouchstart" in document) ? {
				start: "touchstart",
				move: "touchmove",
				end: "touchend"
			} : {
				start: "mousedown",
				move: "mousemove",
				end: "mouseup"
			};

			function getXY(e, obj) {
				var et = e.touches ? e.touches[0] : e;
				var x = et.clientX;
				var y = et.clientY;
				return {
					x: x - obj.offsetLeft + (document.body.scrollLeft || document.documentElement.scrollLeft),
					y: y - obj.offsetTop + (document.body.scrollTop || document.documentElement.scrollTop)
				}
			}

			canvas.addEventListener(on.start, function(e) {
				moveFlag = true;
			}, false);
			canvas.addEventListener(on.move, function(e) {
				if(moveFlag) {
					var k = getXY(e, canvas);
					var r = Math.atan2(k.x - ox, oy - k.y);
					draw((r) / (2 * Math.PI));
					$(".glu").text(val);
					var level=getLevel(getRecordMeals($('input[name="mealtime"]:checked').val()),Number($(".glu").text()));
					$(".canvas-content").removeClass("lanpan jupan hongpan");
					console.log(getRecordMeals($('input[name="mealtime"]:checked').val()),Number($(".glu").text()),level,'lanpan')
					if(level=="FPG001" || level=="FPG002"){
						$(".canvas-content").addClass("hongpan");
					}else if(level=="FPG003"){
						$(".canvas-content").addClass("lanpan");
					}else if(level=="FPG004" || level=="FPG005" || level=="FPG006"){
						$(".canvas-content").addClass("jupan");
					}else{
						$(".canvas-content").addClass("lanpan");
					}
				}
			}, false);
			canvas.addEventListener(on.end, function(e) {
				moveFlag = false;
			}, false);

//			draw(0.2);