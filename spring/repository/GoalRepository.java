package goaldiggers.spyglass.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import goaldiggers.spyglass.model.Goal;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {

}
