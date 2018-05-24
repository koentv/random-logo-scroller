class randomLogos { 

    constructor(availableLogos, container_class, logo_class, timeout) {

        this.availableLogos  = availableLogos;
        this.container       = document.getElementById(container_class);
        this.currentLogos    = this.container.getElementsByClassName(logo_class);
        this.timeout         = timeout;

        // Only run when needed
        if(!this.container || this.currentLogos.length < 1) {
            console.log('The end, no container or no logos');
            return;
        }
    }

    change() {
        let newLogoSrc              = this.selectRandomLogo();
        let targetLogo              = Math.floor((Math.random()*this.currentLogos.length));
        let targetLogoElement       = this.currentLogos[targetLogo];
        let targetLogoElementSrc    = this.currentLogos[targetLogo].src;

        $(targetLogoElement).fadeOut(300, function(){
            $(targetLogoElement).attr('src',newLogoSrc).bind('onreadystatechange load', function(){
                if (targetLogoElement.complete) 
                    $(targetLogoElement).fadeIn(300);
            });
        });

        this.availableLogos.push(targetLogoElementSrc);
    }

    selectRandomLogo() {

        let logoInUse;
        let randomLogoSrc;
        let i = 0;
            
        do {
            //select a new logo from the available set
            let random_number = Math.floor((Math.random()*this.availableLogos.length));
            randomLogoSrc = this.availableLogos[random_number];
            
            //check this logo isn't currently on display
            logoInUse = this.checkLogoNotActive(randomLogoSrc);
            i++;
        } while (logoInUse || i < 100);
       
        this.init();

        return randomLogoSrc;
    }

    checkLogoNotActive(newSrc) {
        for (let i = 0; i < this.currentLogos.length; i++) {                                
            if (newSrc === this.currentLogos[i].src) {
                return true;
            }
        }
        return false;
    }

    init() {
        setTimeout(this.change.bind(this), this.timeout );
    }

}
