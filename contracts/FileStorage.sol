//
// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;
contract FileStorage {
    struct Access {
        address user;
        bool access;
    }
  mapping (address => string[]) myFiles;//to keep track of files of a particular address
  mapping(address=>mapping(address=>bool)) ownershipAccess;//to keep track of which address is allowed by owner to view files
  mapping(address=>mapping(address=>bool)) previousOwnershipStats;//to keep track of wether a adddress who is being given owner ship is not already in accesslist so that that addres is not added twice
  mapping(address=>Access[]) accessList; //to keep track of which address is allowed by owner to view files in a 2d array manner
  function addFiles(string memory fileUri)  public returns (uint){
    for (uint i = 0; i < myFiles[msg.sender].length; i++) {
       if (keccak256(abi.encodePacked(myFiles[msg.sender][i])) == keccak256(abi.encodePacked(fileUri))){
return i;
        }
       
    }
    myFiles[msg.sender].push(fileUri);
    return myFiles[msg.sender].length - 1; 
  }
function allow(address _user) public  {

    //this function will first set the access to true for mapping call ownership access
    ownershipAccess[msg.sender][_user]=true;
    //now we will check wether or not _user is already in acceslist struct or not by comparing it with prevstate if not then we will go to else part other wise in if part we will update that particular _user's access not push him to the acceslist[msg.sendre]'s struct array only update his access 
    if(previousOwnershipStats[msg.sender][_user]){
        for (uint i = 0; i <accessList[msg.sender].length; i++) {
            if(accessList[msg.sender][i].user==_user){
                accessList[msg.sender][i].access=true;
            }
        }

    }
    else{
        previousOwnershipStats[msg.sender][_user]=true;
        accessList[msg.sender].push(Access(_user,true));

    }
}
function disAllow(address _user) public {
    require(ownershipAccess[msg.sender][_user]=true,"The user is not in access list");
    ownershipAccess[msg.sender][_user]=false;
     for (uint i = 0; i <accessList[msg.sender].length; i++) {
            if(accessList[msg.sender][i].user==_user){
                accessList[msg.sender][i].access=false;
            }
        }

}
function display(address _user) public view  returns (string [] memory) {
     require(_user==msg.sender||ownershipAccess[_user][msg.sender],"You don't have access to view the files!!");
     return myFiles[_user];
}
  function shareAccess() public view returns(Access[] memory){
      return accessList[msg.sender];
  }

}