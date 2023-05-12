import data from './people.json';
data.sort((a, b) => b.points - a.points);

function Leaderboard() {
    return (
        <div>
            <h1>
                Leaderboard
            </h1>
            <table class="table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.surname}</td>
                            <td>{item.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default Leaderboard