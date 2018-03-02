var express = require('express'),
  router = express.Router(),
  productCtrl = require('../controllers/c3Controller');
  hproductCtrl = require('../controllers/ProductController');

  const authentication = require('../controllers/authentication')(router);
  app = express();
	memberCtrl = require('../controllers/MemberController');


//-------------------------------Product Routes-----------------------------------
router.get('/c3/getProducts', productCtrl.getProducts);
router.get('/c3/getProduct/:productId', productCtrl.getProduct);
router.get(
  '/c3/getProductsBelowPrice/:price',
  productCtrl.getProductsBelowPrice
);
router.post('/c3/createProduct', productCtrl.createProduct);
router.patch('/c3/updateProduct/:productId', productCtrl.updateProduct);
router.delete('/c3/deleteProduct/:productId', productCtrl.deleteProduct);


app.use('/authentication' , authentication);

//-------------------------------Member Routes-----------------------------------
router.get('/member/getMembers', memberCtrl.getMembers);
router.post('/member/createMember', memberCtrl.createMember);
router.patch('/member/updateMember/:memberId', memberCtrl.updateMember);
router.delete('/member/deleteMember/:memberId', memberCtrl.deleteMember);

//------------------------------User Routes-----------------------------------


module.exports = router;
