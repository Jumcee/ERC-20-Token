const { assert } = require('chai');

describe("Token", () => {
    let token;
    let owner, ownerSigner, a1, s1;
    const totalSupply = ethers.utils.parseEther("1000");

    it('should initialize the token', async () => {
        const Token = await ethers.getContractFactory("Token");
        token = await Token.deploy();
        await token.deployed();

        const accounts = await ethers.provider.listAccounts();
        owner = accounts[0];
        ownerSigner = ethers.provider.getSigner(owner);
        a1 = accounts[1];
        s1 = ethers.provider.getSigner(a1);

        const balance = await token.callStatic.balanceOf(owner);
        assert.equal(balance.toString(), totalSupply.toString());
    });

    it('should transfer tokens successfully', async () => {
        // Transfer tokens from owner to a1
        const tx = await token.connect(ownerSigner).transfer(a1, "1");
        await tx.wait();

        const balanceOwner = await token.callStatic.balanceOf(owner);
        const balanceA1 = await token.callStatic.balanceOf(a1);

        assert.equal(balanceOwner.toString(), totalSupply.sub("1").toString());
        assert.equal(balanceA1.toString(), '1');
    });

    it('should not allow transfer without sufficient funds', async () => {
        let ex;
        try {
            await token.connect(s1).transfer(owner, "1");
        } catch (error) {
            ex = error;
        }
        assert(ex, "The account should not have any funds. Expected this transaction to revert!");
    });

    // Add more test cases as needed...
});
