var VERSION = "localhost";

//Assim que for instanciado, vamos fazer uma requisicao para
//o github api para identificar o ultimo commit

//No heroku, vamos setar essad variavel com
//o repositorio e branch que vamos verificar.
let {GITHUB_REPOSITORY, GITHUB_REPOSITORY_BRANCH} = process.env;

if (GITHUB_REPOSITORY && GITHUB_REPOSITORY_BRANCH) {
    let https = require('https');
    let options = {
        headers: {
            'User-Agent': 'alot-herokuapp/1.0',
        }
    };

    https.get(`https://api.github.com/repos/${GITHUB_REPOSITORY}/branches`, options, (res) => {
        res.setEncoding('utf8');
    
        let data = '';
        res.on('data', d => data += d);
    
        res.on('end', () => {    
            let branches = JSON.parse(data);
            for (index in branches) {
                let branch = branches[index];
                if (branch.name == GITHUB_REPOSITORY_BRANCH) {
                    VERSION = branch.commit.sha.substring(0, 7);
                }
            }
        });
    }).on('error', (e) => {
        console.log(`Houve um erro: ${e.message}`);
    });
}


module.exports = {

    index(req, res) {
        res.status(200).json({api_version: VERSION});
    }

};