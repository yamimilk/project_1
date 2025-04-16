function h(type,props,children){
    return {type,props,children};
}

function mount(vnode,container){
    const el = document.createElement(vnode.type);
    //设置属性(赋予真实dom属性)
    for(const key in vnode.props) {
        el.setAttribute(key,vnode.props[key]);
    }

    //处理子节点
    if(typeof vnode.children === 'string'){
        el.textContent = vnode.children;
    }else if(Array.isArray(vnode.children)){
        //遍历所有子虚拟节点，把它们 mount(逐步增加) 到当前元素中去
        vnode.children.forEach(child => mount(child,el));
    }

    //把创建好的元素 挂载（插入）到父节点中，加入页面
    container.appendChild(el);
    //把真实 DOM 节点 挂到虚拟节点上，这样以后可以快速访问它，不用再重新查找。目的是为了在 diff 比较时，能用 n1.el 拿到旧的真实节点
    vnode.el = el;// 保存对应的真实 DOM 节点引用
}

function patch(n1,n2){
    //复用旧的 DOM 节点，避免不必要的重建
    const el = (n2.el = n1.el);

    //1.类型不同，替换整个元素
    if(n1.type !== n2.type){
        const newE1 = document.childElement(n2.type);
        el.replaceWith(newE1);
        mount(n2,newE1.parentNode);//节点替换    
    }else {
        //2.类型相同，更新props
        //  设置/更新所有新属性
        for(const key in n2.props){
            el.setAttribute(key,n2.props[key]);
        }
        //删除旧属性中多余的
        for(const key in n1.props){
            if(!(key in n2.props)){
                el.removeAttribute(key);
            }
        }
        //3.更新children
        const c1 = n1.children;
        const c2 = n2.children;

        if(typeof c2 === 'string'){
            //更新标签的文本内容。
            el.textContent = c2;
        }else if(Array.isArray(c2)){
            //递归每一个子节点
            for(let i = 0;i<c2.length;i++){
                patch(c1[i],c2[i]);
            }
        }
    }
}

export {h,mount,patch}