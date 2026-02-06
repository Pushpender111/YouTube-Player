let add = document.querySelector('#addMusic')
let musicLink = document.querySelector('#musicLink')
let title = document.querySelector('#musicTitle')
let musicList = document.querySelector('.musicList')
let player = document.querySelector('#musicPlayerFrame')
let MusicArray = JSON.parse(localStorage.getItem("MusicPlaylist")) || []

const display = function(arr){
    arr.forEach(element => {
        let musicListItem = document.createElement('div')
        let play = document.createElement('button')
        let name = document.createElement('p')
        let remover = document.createElement('button')
        let img = document.createElement('img')
        img.style.height = '10px'
        img.style.width = '10px'
        img.setAttribute('src','assets/play.png')
        // play.style.width = '30px'
        play.appendChild(img)
        play.addEventListener('click',function(e){
            e.stopPropagation()
            
            console.log(element[1]);
            
            player.setAttribute('src',element[1])
            
        })
        musicListItem.addEventListener('click',function(e){
            e.stopPropagation()
            console.log(element[1]);
            
            player.setAttribute('src',element[1])
            
        })

        name.innerHTML = element[2]
        // name.style.textWrap = 'nowrap'
        name.style.overflow = 'hidden'
        name.style.width = '300px'
        // name.style.mar = '300px'

        remover.innerText = "Remove"
        remover.style.width = '60px'
        remover.style.color = 'white'
        remover.style.border = 'none'
        remover.style.backgroundColor = 'red'
        remover.style.height = '24px'
        remover.style.borderRadius = '4px'
        remover.style.margin = '4px'
        remover.style.alignSelf = 'center'
        
        remover.addEventListener('click',function(e){
            e.stopPropagation()
            MusicArray = MusicArray.filter(i=>i[0]!==element[0])
            localStorage.setItem("MusicPlaylist",JSON.stringify(MusicArray))
            musicList.innerHTML = ''
            display(MusicArray)
        })


        musicListItem.style.display = 'flex'
        musicListItem.style
        // .justifyContent = 'space'
        musicListItem.style.background = 'powderblue'
        // musicListItem.style.width = '250px'
        musicListItem.style.height = '50px'
        musicListItem.style.margin = '10px'
        // musicListItem.style.padding =  '0px'
        musicListItem.style.borderRadius = '4px'

        musicListItem.appendChild(play)
        play.insertAdjacentElement('afterend',name)
        name.insertAdjacentElement('afterend',remover)

        musicList.appendChild(musicListItem)

    });
}


add.addEventListener('click',function(){
    if(musicLink.value === '' || title.value === '') return
    let id = Date.now()
    let rawlink = musicLink.value
    let vid = ''
    if(rawlink.includes('youtu.be')){
        let ind = 17
        while(ind<rawlink.length){
            if(rawlink[ind]==='?') break
            vid+=rawlink[ind]
            ind++
        }
    }
    if(rawlink.includes('shorts')){
        let ind = 27
        while(ind<rawlink.length){
            if(rawlink[ind]==='?') break
            vid+=rawlink[ind]
            ind++
        }
    }
    if(rawlink.includes('watch')){
        let ind = 32
        while(ind<rawlink.length){
            if(rawlink[ind]==='&') break
            vid+=rawlink[ind]
            ind++
        }
    }

    let link = `https://www.youtube.com/embed/${vid}`

    let item = [id , link, title.value]
    MusicArray.push(item)
    localStorage.setItem('MusicPlaylist',JSON.stringify(MusicArray))
    musicList.innerHTML = ''
    musicLink.value = ''
    title.value = ''
    MusicArray = JSON.parse(localStorage.getItem("MusicPlaylist")) || []
    display(MusicArray)
})


window.onload = function(){
    MusicArray = JSON.parse(localStorage.getItem("MusicPlaylist")) || []
    display(MusicArray)
}
const navBar = document.querySelector('.list')
const navButton = document.querySelector('#navigation')
let isNavbarDisplaying = true

let body = document.querySelector('body')
navButton.addEventListener('click',function(e){
    if(isNavbarDisplaying){
        navBar.className = 'list hidden'
        isNavbarDisplaying = !isNavbarDisplaying
        navButton.innerHTML = 'Show'
        
    }
    else{
        navBar.className = 'list'
        isNavbarDisplaying = !isNavbarDisplaying
        navButton.innerHTML = 'Hide'
    }
    
})
// if(!isNavbarDisplaying){
//     player.appendChild(newNavButton)
// }