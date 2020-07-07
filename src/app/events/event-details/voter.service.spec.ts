import { VoterService } from './voter.service';
import { ISession } from '../shared/event.model';
import { of, Observable } from 'rxjs';

describe('VoterService', () => {
    let voterService: VoterService,
     mockHttp;
    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
        voterService = new VoterService(mockHttp);

    });

    describe('deleteVoter', () => {
        it('should remove the voter from the list of voters', () => {
            let session = { id: 6, voters: ['joe', 'john']};
            mockHttp.delete.and.returnValue(of(false));

            voterService.deleteVoter(3, session as ISession, 'joe');

            expect(session.voters.length).toBe(2);
            expect(session.voters[0]).toBe('john');
        });

        it('should call http.delete with the right URL', () => {
            let session = { id: 6, voters: ['joe', 'john']};
            mockHttp.delete.and.returnValue(of(false));

            voterService.deleteVoter(3, session as ISession, 'joe');

            expect(mockHttp.delete).toHaveBeenCalledWith(`/api/events/3/sessions/6/voters/joe`);
        })
    });
})