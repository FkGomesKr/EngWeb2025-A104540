var contrato = require('../models/contrato')

module.exports.getAllContracts = () => {
    return contrato.find().exec();
};

module.exports.getContractbyID = (id) => {
    return contrato.findById(id).exec();
};

module.exports.getAllContractswithEntidade = (entidade) => {
    return contrato.find({NIPC_entidade_comunicante: entidade}).exec();
};

module.exports.getAllContractswithTipo = (tipo) => {
    return contrato.find({tipoprocedimento: tipo}).exec();
};

module.exports.getAllContractswithEntidadeAndTipo = (entidade, tipo) => {
    return contrato.find({NIPC_entidade_comunicante: entidade, tipoprocedimento: tipo}).exec();
};

module.exports.getAllEntidadesfromContracts = () => {
    return contrato.distinct('entidade_comunicante').sort({entidade_comunicante: 1}).exec();
};

module.exports.getAllTiposfromContracts = () => {
    return contrato.distinct('tipoprocedimento').sort({tipoprocedimento: 1}).exec();
};

module.exports.postnewContract = (contract) => {
    var newContract = new contrato(contract);
    return newContract.save();
}

module.exports.updateContract = (id, contract) => {
    return contrato.findByIdAndUpdate(id, contract, { new: true }).exec();
}

module.exports.deleteContract = (id) => {
    return contrato.findByIdAndDelete(id, { new: true }).exec();
}