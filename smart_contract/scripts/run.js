const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    });
    await waveContract.deployed();
  
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);
  
    /*
   * Consulta saldo do contrato
   */
    let contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    );
    console.log(
        "Saldo do contrato:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log(waveCount.toNumber());
  
    let waveTxn = await waveContract.wave("mensagem #1!");
    await waveTxn.wait(); // aguarda a transação ser minerada

    //let waveTxn2 = await waveContract.wave("mensagem #2!");
    //await waveTxn2.wait(); // aguarda a transação ser minerada
  
    /*
    * Recupera o saldo do contrato para verificar o que aconteceu!
    */
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
        "Saldo do  contrato:",
        hre.ethers.utils.formatEther(contractBalance)
    );
  
    /*waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave("Outra mensagem!");
    await waveTxn.wait(); // aguarda a transação ser minerada

    waveCount = await waveContract.getTotalWaves();*/

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);

  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();