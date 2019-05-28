//data controller


let dataController = (function () {
    //declare local variables and methods here
    let Network = function() {
        this.networkAddress;
        this.hostBits;
        this.octets;
    }

    
    Network.prototype.setBits = function (bits) {
        if (this.validateHostBitsInput(bits)) {
            this.hostBits = bits;
        }
        else 
        {
            return false;
        }
    }

    Network.prototype.setNetworkAddress = function(network) {
        this.networkAddress = network;
    }

    Network.prototype.setOctets = function () {
        this.octects = this.networkAddress.split('.');
    }
    //declare public variables and methods here
    
    return {
            Network : function(obj) {
            let net = new Network(obj.networkAddr, obj.hostBits);
            net.setOctets();
            return net;
            },

            isValidAddress : function (address) {
                const octets = address.split('.');
                isValid = true;
                if (octets.length === 4) {
                    console.log (`there are four octets and they are ${octets}`);
                    octets.forEach(element => {
                        let octet = parseInt(element);
                        if ( isNaN(octet) || octet < 0 || octet > 255  )
                        {
                            isValid = false;
                            console.log(`invalid octet given: ${element}`);
                            return isValid;
                        }
                    });
                } else
                    {
                        console.log(`there were not four octects and they are ${octets}`);
                        isValid = false;
                        return isValid
                    }
                return isValid;
            },

            isValidHostBits : function (bits) {
                let isValid = true;
                if (bits < 1 || bits > 32)
                    isValid = false;
                return(isValid);
            }
    };
})();

//UI Controller

const UIController = (function () {
    //declare local variables and methods here
    DOMstrings = {
        'input': '.input',
        'network': '.network',
        'bits': 'bits',
        'submit': 'button-submit',
        'network': 'network-addr',
        'bits': 'host-bits'
    };

    //declare public variables and methods here
    return {
        getDOMstrings: function () {
            return DOMstrings;
        },
        getInput: function () {
            //do notlike selectAll, change to getting network and bits separately
             const   networkAddr = document.getElementById(DOMstrings.network).value;
             const   hostBits    = document.getElementById(DOMstrings.bits).value;
             //validateInput(networkAddr, hostBits);
             return {
                 networkAddr,
                 hostBits
             }
        }

    };
})();


//App Controller

let App = (function (dataCtrl, uiCtrl) {
    
    const dom = uiCtrl.getDOMstrings();
    
    let setupEventListeners = function () {

        document.getElementById(dom.submit).addEventListener('click', appGetInput);
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                appGetInput();
            }
        });
    }

    let appGetInput = function() {
        let net;
        let isValid = true;
        let input = uiCtrl.getInput();

        //validate hostBits
        if (dataCtrl.isValidHostBits(input.hostBits)) {
            document.getElementById(dom.bits).classList.toggle('invalid', false);
        } else {
            document.getElementById(dom.bits).classList.toggle('invalid', true);
            isValid = false;

        }
      
        //validate network address
        if (dataCtrl.isValidAddress(input.networkAddr)) {
            document.getElementById(dom.network).classList.toggle('invalid', false);
        } else {
            document.getElementById(dom.network).classList.toggle('invalid', true);            
            document.getElementById(dom.network).focus;
            isValid = false;
        }

        if (isValid) {
            console.log(`all input valid: ${input}`);
        }
        else return;
    }
    //return public method init
    return {
        init: function () {
            console.log('CIDR App has started ...');
            //add init code as needed

            //setup default UI fields

            //setup Event Listeners
            setupEventListeners();
        }
    };

})(dataController, UIController);

App.init();