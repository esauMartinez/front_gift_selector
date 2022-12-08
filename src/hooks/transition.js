export const transition = (container, selector) => {
    return new Promise((resolve, reject) => {
        function func() {
            container.removeEventListener('transitionend', func)
            const card = document.getElementById(`card_${selector}`)
            // card.style.transition = '10s'
            card.style.backgroundColor = '#f4f0bb'
            const idr = card.getAttribute('data-employee')
            const id = card.getAttribute('data-id')

            resolve({ id, idr })
        }
        
        container.addEventListener('transitionend', func, false)
    })
}
