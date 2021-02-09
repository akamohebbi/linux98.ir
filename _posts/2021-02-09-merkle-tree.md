---
date: 2021-02-09 12:05:01 +0330
jdate: 1399-11-21
title: Merkle Tree 
author: aminyousefnejad
image: /uploads/launchpresso-h5iazR-wljU-unsplash.jpg
categories:
    - آموزش
    - بلاکچین
tags:
    - آموزش
    - پایتون
    - بلاکچین
---

تو سیستم های غیر متمرکز حجم داده های تقریبا زیادی داریم ، این داده ها از مبدا های مختلفی میاد و همشون ماله یک نفر نیست . نیازه که ما این داده ها رو به طریقی در کنار هم به شکل ایمن نگه داریم . از اونجایی که اطلاعات تو سیستم بلاکچینی تو بلاک ها ثبت می شن و بلاک ها باید غیر قابل تغییر باشن باید این موضوع رو هم مدنظر قرار بدیم . پس به چیزی احتیاج  داریم که مجموعه بزرگی از داده ها رو نگه داره در مقابل تغییر روی خوش نشون نده . راه حل ساختار داده ای به اسم درخت مرکل (Merkle Tree) یا binary hash tree هم بهش میگن . 

<div id="read-more"></div>

برخلاف درخت های واقعی ، درختا تو دنیای کامپیوتری برعکس هستن و ریشه  بالاتر از برگاس ! درخت مرکل هم همینطوریه ، برگای این درخت حاوی هش تک تک عناصر دیتاستمون هستن و یه لول بالاتر از برگا یعنی پدرای برگا حاوی هش دو تا از برگا هستن که فرزندشون محسوب میشه . پس ابتدا مقدار هش دیتاها تک تک محاسبه میشه و تو برگای درخت ذخیره میشه بعد مقدار هشا دو تا دو تا کنار هم قرار میگیرن و دوباره ازشون هش گرفته میشه hash(t1+t2) و این روند تا جایی ادامه پیدا می کنه که به یه مقدار هش برسیم که بهش مرکل روت می گن (Merkle root) . امکانش هست که تعداد برگامون فرد باشه و در آخر یه برگ بدون شریک بمونه و برگی نباشه در اینصورت با خودش ترکیب میشه hash(t5+t5)

![merkle_tree](/uploads/merkle_tree.jpg)



# توابع هش 

احتمالا با توابع هش آشنایی کافی رو دارید در صورتی که نمی دونید این توابع یه دیتایی مثلا متن یا عکس رو میگیرین و یه رشته متنی با طول ثابت رو تولید می کنن . مثلا تابع هش معروف SHA-256 دیتا با طول متغیر رو میگیره و در خروجی همیشه یه رشته متن ۲۵۶ بیتی تحویلمون میده . یه تابع هش خوب باید ویژگی هایی مثل : 

- وروردی ثابت همیشه خروجی ثابت تولید کنه ( هش علی همیشه مساوی ۱۲۳۴ باشه)
- یکطرفه باشه : وقتی ورودی x رو به تابع میدیم و اون خروجی y رو میده ، از لحاظ الگوریتمی غیر ممکن باشه که با y بتونیم x رو به دست بیاریم 
- کالیژن نداشته باشه : دوتا ورودی وجود نداشته باشه که خروجی یکسانی تولید می کنن . ( یا حداقل پیدا کردنش سخت باشه )
- اثر بهمنی ([avalanche effect](https://en.wikipedia.org/wiki/Avalanche_effect?ref=hackernoon.com)) :کوچیکترین تغییری در ورودی باعث تولید خروجی کاملا متفاوتی بشه یا حداقل نیمی از بیت ها تغییر کنن . اینطور نباشه که بگیم h میشه ۱۰۰۵ و وقتی he  میشه ۱۰۵۵ !!

# ویژگی های Merkle Tree

- یکپارچگی داده : روت درخت با کوچکترین تغییر در برگ ها و عناصر میانی تغییر می کنه . حتی جا به جا شدن عناصر دیتاست مرکل روت متفاوتی تولید می کنه . 
- اعتبارسنجی قسمتی از درخت : برای اعتبارسنجی یه داده نیازی نیست کل درختو داشته باشیم فقط لازم مسیری که از برگ شروع میشه و به ریشه میرسه رو داشته باشیم . 

# چه مشکلاتی رو حل میکنه ؟

به عنوان یه نمونه زنده و قابل لمس بیت کوین رو مثال میزنم که از مرکل تری برای مطمئن شدن از تراکنش های داخل یه بلاک ازش استفاده می کنه . بیت کوین برای هر بلاکی که به زنجیرش اضافه میشه فیلدی به اسم مرکل روت داره یعنی میاد تمام تراکنش های داخل یه بلاک رو تو یه مرکل تری ذخیره میکنه . وقتی یه بلاک ماین میشه بقیه نود ها مرکل تری تراکنش ها رو دوباره حساب می کنن و با مقداری که تو بلاک نوشته شده مقایسه می کنن و اینطوری تایید میشه . البته از اونجایی که یه نود می تونه یک سری چرت و پرت به عنوان تراکنش تولید کنه و بعد مرکل روتش رو بدست بیاره نود ها باید تراکنش ها رو با mem pool خودشون هم مقایسه بکنن . 





## پیاده سازی مرکل تری با پایتون 



```python
from hashlib import sha256 

class MerkleNode:
    '''Stores the hash and the parent'''
    def __init__(self,hash):
        self.hash  = hash 
        self.parent = None
        self.left_child = None 
        self.right_child = None

class MerkleTree:
    '''Stores the leaves and the root hash '''
    def __init__(self, string_chunks = None):
        self.leaves=[]
        
        if string_chunks is not None : 
            for data in string_chunks : 
                node = MerkleNode(self.compute_hash(data))
                self.leaves.append(node)
        	self.root = self.build_merkle_tree(self.leaves)

    def get_audit_trail(self , chunk_hash):
        ''' checks if the leaf exists and retrns the audit trail '''

        for leaf in self.leaves:
            if leaf.hash == chunk_hash:
                print("Leaf exists")
                return self.generate_audit_trail(leaf)
        print("Leaf not found")
        return False

    def generate_audit_trail(self , merkle_node , trail=[]):
        '''generate the audit trail in a bottom-up fashion'''

        if merkle_node == self.root :
            trail.append(merkle_node.hash)
            return trail
        is_left = merkle_node.parent.left_child == merkle_node
        if is_left:
            trail.append((merkle_node.parent.right_child.hash , not is_left))
            return self.generate_audit_trail(merkle_node.parent , trail)
        else:
            trail.append((merkle_node.parent.left_child.hash ,not is_left))
            return self.generate_audit_trail(merkle_node.parent , trail)

    def build_merkle_tree(self , leaves):
        '''Builds the merkle tree form a list of leaves , recursive function'''

        leaves_len = len(leaves)
        if leaves_len == 1 :
            return leaves[0]
        parents = [] 

        for i in range(0 , leaves_len , 2):
            left_child = leaves[i]
            right_child = leaves[i + 1 ] if i + 1 < leaves_len else left_child

            parents.append(self.create_parent(left_child , right_child))

        return self.build_merkle_tree(parents)

    def create_parent(self , left_child , right_child):
        '''Creates the parent node form children '''
        parent = MerkleNode ( self.compute_hash(left_child.hash + right_child.hash ))

        parent.left_child , parent.right_child = left_child , right_child
        left_child.parent , right_child.parent = parent , parent 

        print("Left Child : {} , Right Child : {} ,Parent :{}".format(left_child.hash , right_child.hash , parent.hash))

        return parent 

    @staticmethod
    def compute_hash(data):
        data = data.encode()    
        return sha256(data).hexdigest()

def verify_audit_trail(chunk_hash , audit_trail):
        proof_till_now = chunk_hash
        for node in audit_trail[:-1]:
            hash = node[0] 
            is_left = node[1]
            if is_left:
                proof_till_now = MerkleTree.compute_hash(hash + proof_till_now)
            else:
                proof_till_now = MerkleTree.compute_hash(proof_till_now + hash)
            #print(proof_till_now)

        return proof_till_now == audit_trail[-1]
    
    
merkle = MerkleTree(string_chunks=['1','2','3','4','5']) 
hash_number2 = merkle.compute_hash('2') # replace with any input to see if data exists in merkle tree or not 
merkle.get_audit_trail(hash_number2)
```





دارم سعی می کنم تا از مرخصیام استفاده خوبی بکنم چون همونطور که بعضیاتون می دونید تو خدمت سربازی هستم پس اگه کمبود و نقصی بود به پای کم بودن زمان بزارید :)‌فعلا 