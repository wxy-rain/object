//关闭模态框
function closeRecuritmentModal(){
	$("#myModal").modal("hide");
}
$(function(){
	var oId;
	var baseURL = "http://203.195.246.58:7777";
	$('#save').on('click',function(){
		var employmentId = oId;
		var username = $('input[name=username]').val();
		var realname = $('input[name=realname]').val();
		var telephone = $('input[name=telephone]').val();
		var gender = $('input[type=radio]:checked').val();
		var birth = $('input[name=birth]').val();
		var education = $('input[name=education]').val();
		var workTime = $('input[name=workTime]').val();
		//调用接口
		var obj = {
				employmentId:employmentId,
				realname:realname,
				username:username,
				gender:gender,
				birth:birth,
				telephone:telephone,
				education:education
			}
		console.log(obj)
		$.post(baseURL+'/Jobhunter/quickRegistration',obj,function(res){
				// reloadData();
				toast('保存成功');
		})
	})
	//打开快速报名
	$('#con_menu').on({click:function(){
		oId = $(this).find('span').text();
		$('#myModal').modal('show');
		$("#user_form input[name=username]").val('');
		$("#user_form input[name=realname]").val('');
		$("#user_form input[name=telephone]").val('');
		$("#user_form input[name=gender]").val('');
		$("#user_form input[name=birth]").val('');
		$("#user_form input[name=education]").val('');
		$("#user_form input[name=workTime]").val('');
	}},'.m_3')

	// $("#con_menu").on({click:function(){
 //        id=$(this).find("span").text()
 //        $('#myModal').modal('show')  
 //    }},'.m_3')
	//查询所有职位
	function loadWork (){
		$('#work li:not(:first)').empty();
		$.get(baseURL+'/Employment/findAll',function(res){
			var arr = [];
			res.data.forEach(function(item,index){
				if (arr.indexOf(item.job) == -1) {
					arr.push(item.job);
				}

			})
			arr.forEach(function(item){
				$(`<li><a href="javascript:;">`+item+`</a></li>`).appendTo($('#work'))
			})
		})
	}
	loadWork();
	//查询所有地点
	function loadPlace (){
		$('#place li:not(:first)').empty();
		// $.get(baseURL+'/Province/findAll',function(res){
		$.get(baseURL+'/City/findAll',function(res){
			var arr = [];
			res.data.forEach(function(item,index){
				if (arr.indexOf(item.name) == -1) {
					arr.push(item.name);
				}

			})
			arr.forEach(function(item){
				$(`<li><a href="javascript:;">`+item+`</a></li>`).appendTo($('#place'))
			})

			// $('#place').on({click:function(){
			// 	$('#place .s').removeClass('s');
			// 	$(this).addClass('s');
			// 	// $.get(baseURL+'/Province/findAll',function(res){
			// 	// 	var provinceId = item.id;
			// 		$.get(baseURL+'/City/findByProvinceId',{provinceId:$(this).text()},function(res){
			// 			alert(1)
			// 			var arr1 = []; 
			// 			res.data.forEach(function(item,index){
			// 				if (arr1.indexOf(item.name) == -1) {
			// 					arr1.push(item.name);
			// 				}
			// 			})
			// 		// })
			// 		arr1.forEach(function(item){
			// 			$(`<li><a href="javascript:;">`+item+`</a></li>`).appendTo($('#places'))
			// 		})
			// 	})
			// }},'li')
		})
	}
	loadPlace();
	//查询所有福利
	function loadWalf (){
		$('#walf li:not(:first)').empty();
		$.get(baseURL+'/Welfare/findAll',function(res){
			var arr = [];
			res.data.forEach(function(item,index){
				if (arr.indexOf(item.name) == -1) {
					arr.push(item.name);
				}

			})
			arr.forEach(function(item){
				$(`<li><a href="javascript:;">`+item+`</a></li>`).appendTo($('#walf'))
			})
		})
	}
	loadWalf();

	//提示框
	function toast(msg){
		$(".toast .toast-body").text(msg);
		$('.toast').toast('show');
		$(".toast").toast({
			autohide:true,
			delay:2000
		});
	}

	//查询并加载数据
	function reloadData (){
		$('#con_menu').empty();
		$.get(baseURL+'/Employment/findAll',function(res){
			res.data.forEach(function(item){
				$(`<div class="m">
		            <h4>`+item.title+`</h4>
		            <div class="m_1">`+item.salary+` 元/月</div>
		            <div class="w">
		            <div class="m_2 c1">`+item.welfare+`</div>
		            <div class="m_2 c2">包吃</div>
		            <div class="m_2 c3">包住</div>
		           
		            </div>
		            <div class="m_9">
		                <p>工作时间：`+item.workingHours+`</p>
		                <p>工作类型：`+item.job+`</p>
		                <p>招聘人数：`+item.num+`</p>
		                <p>工作地点：`+item.province+`</p>
		            </div>
		            <div class="m_3">一键报名<span>`+item.id+`</span></div>
	            
	        		</div>
					`).appendTo($('#con_menu'))
			})

		})
	}
	reloadData();

	//按职位查找
	$('#work').on({click:function(){
		$('#work .s').removeClass('s');
		$(this).addClass('s');
		$.get(baseURL+'/Employment/findByJob',{job:$(this).text()},function(res){
			$('#con_menu').empty();
			res.data.forEach(function(item){
				$(`<div class="m">
		            <h4>`+item.title+`</h4>
		            <div class="m_1">`+item.salary+` 元/月</div>
		            <div class="w">
		            <div class="m_2 c1">`+item.welfare+`</div>
		           <div class="m_2 c2">包吃</div>
		            <div class="m_2 c3">包住</div>
		            </div>
		            <div class="m_9">
		                <p>工作时间：`+item.workingHours+`</p>
		                <p>工作类型：`+item.job+`</p>
		                <p>招聘人数：`+item.num+`</p>
		                <p>工作地点：`+item.province+`</p>
		            </div>
		            <div class="m_3">一键报名<span>`+item.id+`</span></div>
	            
	        		</div>
					`).appendTo($('#con_menu'))
			})
		})
	}},'li')
	//按地点查找
	$('#place').on({click:function(){
		$('#place .s').removeClass('s');
		$(this).addClass('s');
		$.get(baseURL+'/Employment/findByCity',{title:$(this).text()},function(res){
			$('#con_menu').empty();
			res.data.forEach(function(item){
				$(`<div class="m">
		            <h4>`+item.title+`</h4>
		            <div class="m_1">`+item.salary+` 元/月</div>
		            <div class="w">
		            <div class="m_2 c1">`+item.welfare+`</div>
		            <div class="m_2 c2">包吃</div>
		            <div class="m_2 c3">包住</div>
		            </div>
		            <div class="m_9">
		                <p>工作时间：`+item.workingHours+`</p>
		                <p>工作类型：`+item.job+`</p>
		                <p>招聘人数：`+item.num+`</p>
		                <p>工作地点：`+item.province+`</p>
		            </div>
		            <div class="m_3">一键报名<span>`+item.id+`</span></div>
	            
	        		</div>
					`).appendTo($('#con_menu'))
			})
		})
	}},'li')
	//按福利查找
	$('#walf').on({click:function(){
		$('#walf .s').removeClass('s');
		$(this).addClass('s');
		$.get(baseURL+'/Employment/findByWelfare',{title:$(this).text()},function(res){
			$('#con_menu').empty();
			res.data.forEach(function(item){
				$(`<div class="m">
		            <h4>`+item.title+`</h4>
		            <div class="m_1">`+item.salary+` 元/月</div>
		            <div class="w">
		            <div class="m_2 c1">`+item.welfare+`</div>
		           
		            </div>
		            <div class="m_9">
		                <p>工作时间：`+item.workingHours+`</p>
		                <p>工作类型：`+item.job+`</p>
		                <p>招聘人数：`+item.num+`</p>
		                <p>工作地点：`+item.province+`</p>
		            </div>
		            <div class="m_3">一键报名<span>`+item.id+`</span></div>
	            
	        		</div>
					`).appendTo($('#con_menu'))
			})
		})
	}},'li')
	//按职位具体查找数据
	$('#sb').on('click',function(){
		var job = $('#ss').val();
		var data = {
			job:job
		}
    	$.get(baseURL+'/Employment/findByJob',data,function(res){
    		$('#con_menu').empty();
			res.data.forEach(function(item){
				$(`<div class="m">
		            <h4>`+item.title+`</h4>
		            <div class="m_1">`+item.salary+` 元/月</div>
		            <div class="w">
		            <div class="m_2 c1">`+item.welfare+`</div>
		            <div class="m_2 c2">包吃</div>
		            <div class="m_2 c3">包住</div>
		            </div>
		            <div class="m_9">
		                <p>工作时间：`+item.workingHours+`</p>
		                <p>工作类型：`+item.job+`</p>
		                <p>招聘人数：`+item.num+`</p>
		                <p>工作地点：`+item.province+`</p>
		            </div>
		            <div class="m_3">一键报名<span>`+item.id+`</span></div>
	            
	        		</div>
					`).appendTo($('#con_menu'))
			})

		})
		
	})
	
})

 