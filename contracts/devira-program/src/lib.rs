use stylus_sdk::{stylus_contract, storage::StorageString, prelude::*};

#[stylus_contract]
struct ProfileStorage {
    #[storage]
    cid: StorageString,
}

#[external]
impl ProfileStorage {
    pub fn new(cid: String) -> Result<Self, Vec<u8>> {
        Ok(Self { cid: StorageString::new(cid) })
    }

    pub fn get_cid(&self) -> Result<String, Vec<u8>> {
        Ok(self.cid.get())
    }
}