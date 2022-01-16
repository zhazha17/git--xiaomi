function animate(obj, target, callback) {
    // console.log(callback);  callback = function() {}  调用的时候 callback()
    // 先清除一下定时器,只保留当前的一个定时器执行
    clearInterval(obj.timer);
    // 给这个目标对象添加一个属性
    obj.timer = setInterval(function() {
        // 因为每次都要重新计算步长值，所以写到定时器里
        // 因为除法的存在，盒子移动的位置会是小数，要给它取整
        // 当移动距离>0时，向上取整 Math.ceil
        // 当移动距离<0时，向下取整 Math.floor
        var step = (target - obj.offsetLeft) / 10;
        // 利用三元表达式来判断
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            // 停止动画，本质是停止定时器
            clearInterval(obj.timer);
            // 回调函数写到定时器结束里面
            // 判断有没有回调函数，若有，则调用
            if (callback) {
                // 调用函数
                callback();
            }
        }
        // 把每次加1 这个步长值改为一个慢慢小的值 步长公式：（目标值 - 现在的位置）/ 10 
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15)
}