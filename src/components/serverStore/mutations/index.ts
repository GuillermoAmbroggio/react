export { default as useLogin } from './auth/useLogin';
export { default as useLogout } from './auth/useLogout';
export { default as useForgotPassword } from './auth/useForgotPassword';
export { default as useRegister } from './auth/useRegister';
export { default as useResetPassword } from './auth/useResetPassword';

/* Users */
export { default as useCreateUser } from './auth/useRegister';
export { default as useEditUser } from './user/useEditUser';
export { default as useEditPassword } from './user/useEditPassword';

/* Team */
export { default as useCreateTeam } from './team/useCreateTeam';
export { default as useEditTeam } from './team/useEditTeam';

/* Images */
export { default as useUploadImage } from './image/useUploadImage';

/* Tournament */
export { default as useCreateTournament } from './tournament/useCreateTournament';
export { default as useEditTournament } from './tournament/useEditTournament';

/* Fixture */
export { default as useCreateFixture } from './fixture/useCreateFixture';
export { default as useEditFixture } from './fixture/useEditFixture';

/* Match */
export { default as useCreateMatch } from './match/useCreateMatch';
export { default as useEditMatch } from './match/useEditMatch';

/* Ticket */
export { default as useCreateTicket } from './ticket/useCreateTicket';
export { default as useEditTicket } from './ticket/useEditTicket';

/* Google */
export { default as useLoginGoogle } from './google/useLoginGoogle';

/* Email */
export { default as useClaimPrize } from './email/useClaimPrize';
export { default as useSupportMessage } from './email/useSupportMessage';
