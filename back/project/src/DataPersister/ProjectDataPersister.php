<?php

// src/DataPersister/UserDataPersister.php

namespace App\DataPersister;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\Person;
use App\Entity\Project;
use App\Repository\PersonRepository;
use Psr\Log\LoggerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 *
 */
class ProjectDataPersister implements ContextAwareDataPersisterInterface
{
    private $_entityManager;
    private $_passwordEncoder;
    private $logger;
    private $tokenStorage;
    private $personRepository;

    public function __construct(
        EntityManagerInterface $entityManager,
        UserPasswordEncoderInterface $passwordEncoder,
        TokenStorageInterface $tokenStorage,
        LoggerInterface $logger,
        PersonRepository $personRepository
    ) {
        $this->_entityManager = $entityManager;
        $this->_passwordEncoder = $passwordEncoder;
        $this->logger = $logger;
        $this->tokenStorage = $tokenStorage;
        $this->personRepository = $personRepository;
    }

 
    
    public function supports($data, array $context = []): bool
    {
        return $data instanceof Project;
    }

  
    
    public function persist($data, array $context = [])
    {
        $project = $data;
        $this->logger->info('TEST TEST $context ' . serialize($context));

        if('post' === $context['collection_operation_name']) {
            
            $this->logger->info('TEST TEST POST  ' . $context['resource_class']);
            
            $user = $this->tokenStorage->getToken()->getUser();
            $person = $this->personRepository->find($user->getId());

            $project->setUser($person);
            $project->setUpdatedAt(new \DateTime());
            $project->setCreatedAt(new \DateTime());
        }
        
        
        $this->_entityManager->persist($project);
        $this->_entityManager->flush();
    }

 
    
    public function remove($data, array $context = [])
    {
        $this->_entityManager->remove($data);
        $this->_entityManager->flush();
    }
}