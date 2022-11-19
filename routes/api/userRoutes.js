const router = require ('express').Router()
const { getallUsers,
        createUser,
        updateUser,
        getuserbyId,
        deleteUser,
        addFriend,
        deleteFriend,
    } = require ('../../controllers/userController')

    router.route('/').get(getallUsers).post(createUser)

    router.route('/:userid').get(getuserbyId).put(updateUser).delete(deleteUser);

    router.route('/:userid/friends/:friendid').post(addFriend).delete(deleteFriend)

    module.exports = router;