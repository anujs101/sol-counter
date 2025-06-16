use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,
};

// Declare the Solana entrypoint
entrypoint!(counter_contract);

// Use CamelCase for enums (Rust convention)
#[derive(BorshDeserialize, BorshSerialize)]
enum InstructionType {
    Increment(u32),
    Decrement(u32),
}

#[derive(BorshDeserialize, BorshSerialize)]
struct Counter {
    count: u32,
}

pub fn counter_contract(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    let acc = next_account_info(account_info_iter)?;

    // Decode the instruction
    let instruction_type = InstructionType::try_from_slice(instruction_data)?;
    
    // Deserialize counter from account data
    let mut counter_data = Counter::try_from_slice(&acc.data.borrow())?;

    // Execute logic
    match instruction_type {
        InstructionType::Increment(value) => {
            msg!("Executing Increment");
            counter_data.count += value;
        }
        InstructionType::Decrement(value) => {
            msg!("Executing Decrement");
            counter_data.count -= value;
        }
    }

    // Serialize updated counter back to the account's data
    counter_data.serialize(&mut &mut acc.data.borrow_mut()[..])?;

    msg!("Contract Executed Successfully!!");
    Ok(())
}
//Program Id: 8i3oCBGigfCavabk8kNZC89Aw9Y4uvkEz7BmrQPmXviG
//Signature: 3vSeGH46z1Q6x83DJmvLwf4AXJCcvLURYtNUd4Grw5dufQvpxkb8HuyiWfnmn84AbTnrbpp5oJYb8ASqGX1zVXbq
