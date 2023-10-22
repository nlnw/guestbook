// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Guestbook {
    struct Post {
        address sender;
        string message;
        address encrypted_receiver;
        string encrypted_message;
    }
    Post[] public posts;

    event Posted(Post post);

    function post(string calldata message) external returns (uint) {
        return this.postEncrypted(message, address(0), "");
    }

    function postEncrypted(
        string calldata message,
        address encrypted_receiver,
        string calldata encrypted_message
    ) external returns (uint) {
        posts.push(
            Post({
                sender: tx.origin,
                message: message,
                encrypted_receiver: encrypted_receiver,
                encrypted_message: encrypted_message
            })
        );
        emit Posted(posts[posts.length - 1]);
        return posts.length - 1;
    }
}
