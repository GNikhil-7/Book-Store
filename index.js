function getOutermostParent(elem,parentName){
    while(elem && elem.nodeName.toLowerCase() != parentName.toLowerCase() && elem.parentElement){
        elem = elem.parentElement;
    }
    if(elem.nodeName.toLowerCase() == parentName.toLowerCase()){
        return elem
    }
    return null;
}
function mapTableKeys(elems){
    var payload = [];
    var trs = document.querySelectorAll("th");
    Array.prototype.forEach.call(trs,function(elem,index){
        payload.push(`${elem.textContent}=${elems[index] ? elems[index].textContent : ''}`);
    })
    return payload.join("&");
}

async function sendPayload(payload,url){
    var ajx = new XMLHttpRequest();
    ajx.open('POST',url);
    ajx.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajx.send(payload);
    ajx.addEventListener("load",function(){
        if(ajx.status == 200){
            console.log("success");
        }
        else
        {
            console.log("not success");
        }
    })
}
document.addEventListener("DOMContentLoaded",function(){
    var table = this.querySelector("table");
    table?.addEventListener("click",function(ev){
        if(ev.target.nodeName.toLowerCase() == 'button'){
            var targetNode = getOutermostParent(ev.target,'tr');
            var btnName = ev.target.className.toLowerCase();
            if(targetNode){
                var edtBtn = targetNode.querySelector(".edit");
                var svBtn = targetNode.querySelector(".save");
                var dltBtn = targetNode.querySelector(".delete");
                var tContent = targetNode.querySelectorAll('.cntn');
                if(btnName == 'edit'){
                    edtBtn.hidden = true;
                    svBtn.hidden = false;
                    Array.prototype.map.call(tContent,function(ele){
                        ele.contentEditable = true;
                    })
                }
                else if(btnName == "save"){
                    edtBtn.hidden = false;
                    svBtn.hidden = true;
                    Array.prototype.map.call(tContent,function(ele){
                        ele.contentEditable = false;
                    })
                    sendPayload(mapTableKeys(tContent),"/add");
                }
                else
                {
                    // delete functionality
                }
            }
        }
    })
})