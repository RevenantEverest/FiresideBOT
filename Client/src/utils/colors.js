const services = {};

services.hexToRgba= (hex, alpha=1) => {
    let c;
    let re = /^#([A-Fa-f0-9]{3}){1,2}$/;
    if(re.test(hex)){
        c = hex.substring(1).split('');
        if(c.length === 3)
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];

        c = '0x' + c.join('');
        let rgb = [(c>>16)&255, (c>>8)&255, c&255].join(',');
        return 'rgba(' + rgb +',' + alpha +')';
    }
    throw new Error('Bad Hex');
};

export default services;