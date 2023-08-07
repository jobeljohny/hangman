using Hangman_Backend.Models;
using System.Collections.Concurrent;

namespace Hangman_Backend.Services
{
    public interface IGameSessionService
    {
        void StoreGameSession(GameSession session);
        GameSession RetrieveGameSession(string username);
        void RemoveGameSession(string username);
    }

    public class GameSessionService : IGameSessionService
    {
        private readonly ConcurrentDictionary<string, GameSession> _sessions = new ConcurrentDictionary<string, GameSession>();

        public void StoreGameSession(GameSession session)
        {
            _sessions.AddOrUpdate(session.Username, session, (key, oldValue) => session);
        }

        public GameSession RetrieveGameSession(string username)
        {
            _sessions.TryGetValue(username, out GameSession session);
            return session;
        }

        public void RemoveGameSession(string username)
        {
            _sessions.TryRemove(username, out _);
        }
    }
}
