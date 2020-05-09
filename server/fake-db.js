const Product = require('./model/product')

class FakeDb {

    constructor() {
        this.products = [
            {
                coverImage: './assets/img/original.jpg',
                headImage: './assets/img/uriel-soberanes.jpg',
                name: 'T-1017-XL',
                description: 'すべてが、異次元のスケール。',
                productcopy1: '圧倒される存在感。',
                description2: '全てを大きく、美しく。このボリューム感に、あなたもきっと満足。',
                heading1: 'サンプルテキスト１',
                heading2: 'サンプルテキスト２',
                heading3: 'サンプルテキスト３',
                headingtext1: 'サンプルテキスト1',
                headingtext2: 'サンプルテキスト2',
                headingtext3: 'サンプルテキスト3',
                productImage: './assets/img/bird.jpg',
                productImage2: './assets/img/antoine-barres.jpg',
                productImage3: './assets/img/bruno-abatti.jpg',
                productcopy2: '',
                description3: '',
                productcopy3: '',
                description4: '',
                description5: ''
            },
            {
                coverImage: './assets/img/original.jpg',
                headImage: './assets/img/daniel-olahh.jpg',
                name: 'A-0317-SS',
                description: 'あなたのポケットに収まる、小さな宇宙。',
                productcopy1: 'あなたの生活を小さく、確実に変える。',
                description2: '',
                heading1: 'サンプルテキスト１',
                heading2: 'サンプルテキスト２',
                heading3: 'サンプルテキスト３',
                headingtext1: 'サンプルテキスト1',
                headingtext2: 'サンプルテキスト2',
                headingtext3: 'サンプルテキスト3',
                productImage: './assets/img/bird.jpg',
                productImage2: './assets/img/antoine-barres.jpg',
                productImage3: './assets/img/bruno-abatti.jpg',
                productcopy2: '',
                description3: '',
                productcopy3: '',
                description4: '',
                productcopy4: '',
                description5: ''
            },
            {
                coverImage: './assets/img/original.jpg',
                headImage: './assets/img/soroush-karimi.jpg',
                name: 'K-0324-M',
                description: '真っすぐに行く、王道。',
                productcopy1: 'ただそこにある安心感。',
                description2: '',
                heading1: 'サンプルテキスト１',
                heading2: 'サンプルテキスト２',
                heading3: 'サンプルテキスト３',
                headingtext1: 'サンプルテキスト1',
                headingtext2: 'サンプルテキスト2',
                headingtext3: 'サンプルテキスト3',
                productImage: './assets/img/bird.jpg',
                productImage2: './assets/img/antoine-barres.jpg',
                productImage3: './assets/img/bruno-abatti.jpg',
                productcopy2: '',
                description3: '',
                productcopy3: '',
                description4: '',
                productcopy4: '',
                description5: ''
            },
            {
                coverImage: './assets/img/original.jpg',
                headImage: './assets/img/login-image.jpg',
                name: 'R-1228-SP',
                description: 'これ一つで、世界が変わる、変えられる。',
                productcopy1: '目に映るすべてのものを、美しく。',
                description2: '',
                heading1: 'サンプルテキスト１',
                heading2: 'サンプルテキスト２',
                heading3: 'サンプルテキスト３',
                headingtext1: 'サンプルテキスト1',
                headingtext2: 'サンプルテキスト2',
                headingtext3: 'サンプルテキスト3',
                productImage: './assets/img/bird.jpg',
                productImage2: './assets/img/antoine-barres.jpg',
                productImage3: './assets/img/bruno-abatti.jpg',
                productcopy2: '',
                description3: '',
                productcopy3: '',
                description4: '',
                productcopy4: '',
                description5: ''
            }
        ]
    }

    async initDb() {
        await this.cleanDb()
        this.pushProductsToDb()
    }

    async cleanDb() {
       await Product.deleteMany({})
    }

    pushProductsToDb() {
        this.products.forEach(
            (product) => {
                const newProduct = new Product(product)
                newProduct.save()
            }
        )
    }

    seeDb() {
        this.pushProductsToDb()
    }
}

module.exports = FakeDb