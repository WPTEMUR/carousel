// ООП

class CAROUSEL {
    constructor(obj) {
        this.inner = document.querySelector(obj.el.inner)
        this.slides = [...this.inner.children]
        this.active = obj.active
        this.direction = obj.direction.toUpperCase() === "X" ? obj.direction.toUpperCase() : "Y"
        this.speed = obj.speed <= 1000 && obj.speed >= 300 ? obj.speed : 1000
        this.prev = document.querySelector(obj.btn.prev)
        this.next = document.querySelector(obj.btn.next)
        this.selfSpeed = obj.selfSpeed

        this.width = this.minWidth()
        this.heigth = this.minHeight()
        this.size = this.direction === "X" ? this.width : this.heigth
        let ul = document.createElement('ul')

        this.inner.style = `
                    width: ${this.width}px;
                    height: ${this.heigth}px;
                    margin-left: auto;
                    margin-right: auto;
                    position: relative;
                    overflow: hidden;
        `
        this.slides.forEach((el, i) => {
            el.style = `
                    width: 100%;
                    height: 100%;
                    position: absolute;  
                    object-fit: cover;  
            `
            ul.innerHTML += `<li class="li"></li>`
            if (i !== this.active) {
                el.style.transform = `translate${this.direction}(${this.size}px)`
                el.style.transition = `0s`
            }
        })
        document.querySelector('body').append(ul)

        this.prev.addEventListener('click', () => this.leftOrRigth(this.prev))
        this.next.addEventListener('click', () => this.leftOrRigth(this.next))
    }
    minWidth() {
        return Math.min(...this.slides.map(el => el.clientWidth))
    }

    minHeight() {
        return Math.min(...this.slides.map(el => el.clientHeight))
    }

    leftOrRigth(side) {
        side.disabled = true;
        setTimeout(() => {
            side.disabled = false;
        }, 1200);

        let aside = side === this.next ? -this.size : this.size
        
        this.slides.forEach((el, i) => {
            el.style.transition = "0s"
            if (i !== this.active) {
                el.style.transform = `translate${this.direction}(${-aside}px)`
            }
            
            
        })
        this.slides[this.active].style.transform = `translate${this.direction}(${aside}px)`
        this.slides[this.active].style.transition = `${this.speed}ms linear`
        
        if (side === this.next) {
            this.active++
            if (this.active >= this.slides.length) {
                this.active = 0
            }
        } else if (side === this.prev) {
            this.active--
            if (this.active < 0) {
                this.active = this.slides.length - 1
            }
        }
        this.slides[this.active].style.transform = `translate${this.direction}(0px)`
        this.slides[this.active].style.transition = `${this.speed}ms linear`
    }
}

new CAROUSEL({
    el: {inner: '.inner'},
    btn: {
        prev: '.prev',
        next: '.next'
    },
    direction: 'x',
    speed: 200,
    selfSpeed: 5000,
    active: 0,
})
new CAROUSEL({
    el: {
        inner: '.footer__inner',
    },
    btn: {
        prev: '.prev2',
        next: '.next2'
    },
    direction: 'y',
    speed: 1000,
    selfSpeed: 3000,
    active: 0,
})