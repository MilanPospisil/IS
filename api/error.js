
class Error
{
    static no_privilleges()
    {
        return new Promise((resolve, reject) =>
        {
            resolve({success : false, error : "You dont have privilleges."});
        });
    }

    static error(message)
    {
        return new Promise((resolve, reject) =>
        {
            resolve({success : false, error : message});
        });
    }
}

module.exports.Error = Error;