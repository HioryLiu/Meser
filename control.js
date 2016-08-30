 
  function tooltipHtml(d){
    let type;
    if (d.type=="mobile") {
      type="电话：";
    }else if(d.type=="person"){
      type="证件号：";
    }else{
      type="未知类别：";
    }
    return "<h4>结点信息</h4><table>"+
        "<tr><td>"+(type)+"</td><td>"+(d.value)+"</td></tr>"+
        "<tr><td>风险等级：</td><td>"+(d.riskLevel)+"</td></tr>"+
        "<tr><td>信用分：</td><td>"+(d.riskScore)+"</td></tr>"+
        "</table>";
  }


    function loadAnimHtml(){
    return "<div class=\"rect1\"></div>"+
           "<div class=\"rect2\"></div>"+
           "<div class=\"rect3\"></div>"+
           "<div class=\"rect4\"></div>"+
           "<div class=\"rect5\"></div>";
  }

  function infoHtml(d){
    return  "<table><tr><td>Group风险等级：</td><td>"+(d.output.graph.GroupFraudLevel)+"</td></tr>"+
        "<tr><td>Group风险描述：</td><td>"+(d.output.graph.GroupFraudDesc)+"</td></tr>"+
        "</table>";
  }

  function mobileHtml(d){
    return "<p>"+(d.value)+"</p>"+
        "<table>"+
        "<tr><td>个人风险等级：</td><td>"+(d.riskLevel)+"</td></tr>"+
        "<tr><td>个人信用分：</td><td>"+(d.riskScore)+"</td></tr>"+
        // "<tr><td>Group风险等级：</td><td>"+(d.groupRisk)+"</td></tr>"+
        // "<tr><td>Group风险描述：</td><td>"+(d.groupRiskDesc)+"</td></tr>"+
        "</table>"; 
  }

   function check(d,nodes){
        let dValue;
        let type;
            if (d.id) {
              dValue=d.id;
              type="person";

            }else if(d.number){
              dValue=d.number;
              type="phone";
            }else{
              console.log("dValue 赋值出错");
            }

            
            let len1=nodes.length;
            let bx=false;
            // let index;
            for (let m=0;m<len1;m++){//检查id是否存在于nodes中。           
              if (dValue == nodes[m].value) {
                // console.log(dValue+"已添加，在第"+(m+1));
                nodes[m].linkNum+=1;
                bx=true;
                // index=m;
                break;
              }
            }
            if (!bx) {//若不存在，则将节点添加到nodes中。
              let levelset=(d.riskLevel==undefined)?0:d.riskLevel;           
              nodes.push({name:type,value:dValue,level:levelset,linkNum:1,initFlag:1});
              // index=(nodes.length)-1;    
            }

          // console.log("-------s1------------------------"+index);
          return dValue;
      }


      function getMobileRisk(number){
         $.ajax({
          type:"GET",
          // url:'http://192.168.1.101:9081/mobile_risk_graph?mobile_number='+number,
          url:"http://localhost:3001/mobileRiskGraph?mobile_number="+number,
          // url:'http://uat.creditx.io/data-viz/mobile_risk_graph?mobile_number='+number,
          async:true,
          success:function(result){
            // console.log(typeof result);
            // console.log(result);
            // var res = JSON.parse(result);
            d3.select("#groupInfo").html(infoHtml(result));
          }
        });
      }


