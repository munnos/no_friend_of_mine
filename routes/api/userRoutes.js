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

    router.route('/:userId').get(getuserbyId).put(updateUser).delete(deleteUser);

    router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

    module.exports = router;