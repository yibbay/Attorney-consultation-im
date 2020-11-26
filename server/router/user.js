const { schema } = require('../mongodb')
const PREFIX = '/user'
const SCHEMA = 'Users'
const NodeRSA = require('node-rsa');
const fs = require('fs');
const privateKeyPath = './pem/private.pem'
const publicKeyPath = './pem/public.pem'
const puppeteer = require('puppeteer');

let PRIVATEKEY;

// 通过私钥解密密码
function getDecryptPassword(password) {
    return new Promise((resolve, reject) => {
        if (PRIVATEKEY) {
            resolve(PRIVATEKEY.decrypt(password, 'utf8'))
            return;
        }
        fs.exists(privateKeyPath, function (exists) {
            if (exists) {
                var pem = fs.readFileSync(privateKeyPath, 'utf8')
                PRIVATEKEY = new NodeRSA(pem);
                PRIVATEKEY.setOptions({ encryptionScheme: 'pkcs1' });
                resolve(PRIVATEKEY.decrypt(password, 'utf8'))
            } else {
                reject(false)
            }
        })
    })
};



module.exports = (router) => {
    // 登录 
    router.post(`${PREFIX}/login`, async (ctx) => {
        const { phone, password } = ctx.request.body

        await schema[SCHEMA].findOne({ phone }).then(async res => {
            if (!res) {
                ctx.fail('账号不存在');
            } else {
                let decryptPassword = await getDecryptPassword(password);
                let decryptResPassword = await getDecryptPassword(res.password);

                if (decryptPassword === decryptResPassword) {
                    ctx.success(res);
                } else {
                    ctx.fail('密码错误');
                }
            }
        }).catch((err) => {
            ctx.fail(err);
        })

    })
    // 注册 
    router.post(`${PREFIX}/register`, async (ctx) => {
        const { phone, password } = ctx.request.body
        const user = new schema[SCHEMA]({
            phone,
            password,
        })
        await user.save()
            .then(() => {
                ctx.success(true);
            })
            .catch(err => {
                ctx.fail(err);
            })
    })
    //增
    router.post(`${PREFIX}/add`, async (ctx) => {
        const { userId, name, password, age, sex } = ctx.request.body
        const user = new schema[SCHEMA]({
            name,
            phone,
            password,
            age,
            sex
        })
        await user.save()
            .then(() => {
                ctx.success(true);
            })
            .catch(err => {
                ctx.fail(err);
            })
    })

    //删
    router.get(`${PREFIX}/delete`, async ctx => {
        await schema[SCHEMA].deleteMany(ctx.query).then(res => {
            ctx.success(res);
        }).catch((err) => {
            ctx.fail(err);
        })
    })

    //改
    router.get(`${PREFIX}/update`, async ctx => {
        await schema[SCHEMA].updateMany(
            ctx.query,
            {
                $set: { 'name': 'MongoDB' }
            }).then(res => {
                ctx.success(res);
            }).catch((err) => {
                ctx.fail(err);
            })
    })

    //查
    router.post(`${PREFIX}/search`, async (ctx) => {
        let { pageNum, pageSize } = ctx.request.body
        console.log(ctx.request.body)
        await Promise.all([
            schema[SCHEMA].find(ctx.query).count(),
            schema[SCHEMA].find(ctx.query).limit(pageSize).skip((pageNum - 1) * pageSize)
        ]).then(datas => {
            let total = datas[0];
            let list = datas[1] || [];
            ctx.success({
                total,
                list
            });
        }).catch((err) => {
            ctx.fail(err);
        })
    })

    // 测
    router.get(`${PREFIX}/test`, async (ctx) => {
        ctx.success({ title: "连接成功" });
    })

    // 测
    router.post(`${PREFIX}/pdf`, async (ctx) => {
        let { pdfPageUrl, companyName, name } = ctx.request.body
        console.log(ctx.request.body)
        const browser = await puppeteer.launch({
            args: ['--no-sandbox',
                    '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        await page.goto(pdfPageUrl, { waitUntil: 'networkidle2' });
        await page.pdf({ path: `pdf_down/${companyName}-${name}.pdf`});

        await browser.close();
        setTimeout(function () {
            console.log('delete')
            fs.unlink(`pdf_down/${companyName}-${name}.pdf`, () => {

            })
        }, 10000)
        ctx.success({});
    })
};
