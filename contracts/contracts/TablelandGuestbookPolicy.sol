// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

library Policies {
    /**
     * @dev Joins multiple conditional clauses for {TablelandPolicy}'s `whereClause` and `withCheck` fields.
     */
    function joinClauses(
        string[] memory clauses
    ) internal pure returns (string memory) {
        bytes memory clause;
        for (uint256 i = 0; i < clauses.length; i++) {
            if (bytes(clauses[i]).length == 0) {
                continue;
            }
            if (bytes(clause).length > 0) {
                clause = bytes.concat(clause, bytes(" and "));
            }
            clause = bytes.concat(clause, bytes(clauses[i]));
        }
        return string(clause);
    }
}

interface ITablelandController {
    /**
     * @dev Object defining how a table can be accessed.
     */
    struct Policy {
        bool allowInsert;
        bool allowUpdate;
        bool allowDelete;
        string whereClause;
        string withCheck;
        string[] updatableColumns;
    }

    /**
     * @dev Returns a {Policy} struct defining how a table can be accessed by `caller`.
     */
    function getPolicy(address caller) external payable returns (Policy memory);
}

contract GuestbookPolicy {
    function getPolicy(
        address
    ) public payable returns (ITablelandController.Policy memory) {
        return
            ITablelandController.Policy({
                allowInsert: true,
                allowUpdate: false,
                allowDelete: false,
                whereClause: Policies.joinClauses(new string[](0)),
                withCheck: Policies.joinClauses(new string[](0)),
                updatableColumns: new string[](0)
            });
    }
}
